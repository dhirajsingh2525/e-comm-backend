require("dotenv").config()
const app = require("./src/app");
const connectToDB = require("./src/db/db");
const patch = require("path")

connectToDB();

app.get("*", (req, res) => {
  res.sendFile(path.resolve("public/index.html"));
});

app.listen(process.env.PORT, ()=>{
    console.log("server is running on port 3000")
})