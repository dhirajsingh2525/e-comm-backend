const orderModel = require("../models/order.model");
const productModel = require("../models/products.model");
const usersModel = require("../models/users.model");


async function createOrder(req,res) {
    const { userId, products  } = req.body

      const user = await usersModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
      
    for( let item of products){
      const product = await productModel.findById(item.productId);
    if (!product) {
      return res.status(400).json({ message: "Product not found" });
    }
  }

    const newOrder = await orderModel.create({
         userId,
         products,
         status: "Pending"
    })

    res.status(201).json({
        message: "order confirm",
        order: newOrder
    })
}

async function getOrder(req, res) {
  try {

    const userId = req.user._id;

    const orders = await orderModel.find({
      userId: userId
    })
    .populate("userId", "fullname email")
    .populate("products.productId", "title price images");

    if (orders.length === 0) {
      return res.status(404).json({
        message: "No orders found"
      });
    }

    res.status(200).json({
      message: "Orders fetched successfully",
      orders
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
}

module.exports = {
    createOrder,
    getOrder
}