const express = require("express");
const app = express();
const PORT = 3000;
const path = require("path");
const mongoose = require("mongoose");
const Product = require("./models/product");

mongoose
  .connect("mongodb://localhost:27017/farmStand")
  .then(() => {
    console.log("Connection to mongo open");
  })
  .catch((err) => {
    console.log("Connection to mongo failed");
    console.log(err);
  });

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/products", async (req, res) => {
  const products = await Product.find({});
  console.log(products);
  res.render("products/index", { products });
  // res.send("ALL PRODUCTS WILL BE HERE");
});

app.listen(PORT, () => {
  console.log(`App is listening on ${PORT}`);
});
