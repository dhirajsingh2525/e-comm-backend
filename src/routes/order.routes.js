const express = require('express');
const router = express.Router();
const orderController = require("../controllers/order.controller");
const authMiddleware = require("../middleware/auth.middleware");



router.post("/order", authMiddleware.authUser,  orderController.createOrder)
router.get("/order", authMiddleware.authUser, orderController.getOrder)

module.exports = router;