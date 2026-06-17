require("dotenv").config();

const app = require("./src/app");
const connectToDB = require("./src/db/db");
const path = require("path");
const express = require("express")

connectToDB();

app.use(express.static(path.join(__dirname, "public")));

app.use((req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(process.env.PORT, () => {
  console.log("server is running on port 3000");
});