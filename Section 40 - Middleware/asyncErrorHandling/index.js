const express = require("express");
const app = express();
const PORT = 3000;
const path = require("path");
const mongoose = require("mongoose");
const Product = require("./models/product");
const methodOverride = require("method-override");
const AppError = require("./AppError");

mongoose
  .connect("mongodb://localhost:27017/farmStand2")
  .then(() => {
    console.log("Connection to mongo open");
  })
  .catch((err) => {
    console.log("Connection to mongo failed");
    console.log(err);
  });

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.get("/products", async (req, res) => {
  const { category } = req.query;
  if (category) {
    const products = await Product.find({ category: category });
    res.render("products/index", { products, category });
  } else {
    const products = await Product.find({});
    res.render("products/index", { products, category: "All" });
  }
});

const categories = ["fruit", "vegetable", "dairy"];
app.get("/products/new", (req, res) => {
  // throw new AppError("Not Allowed", 401);
  res.render("products/new", { categories });
});

app.post("/products", async (req, res, next) => {
  try {
    console.log(req.body);
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.redirect(`/products/${newProduct._id}`);
  } catch (e) {
    next(e);
  }
});

app.get("/products/:id", async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  if (!product) {
    // Return will stop the execution of render
    return next(new AppError("Product Not Found", 404));
  }
  res.render("products/details", { product });

  // if (product) {
  //   res.render("products/details", { product });
  // } else {
  //   res.send("Error. Couldn't find a product with this ID");
  // }
});

app.get("/products/:id/edit", async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  res.render("products/edit", { product, categories });
});

app.put("/products/:id", async (req, res) => {
  const { id } = req.params;
  const product = await Product.findByIdAndUpdate(id, req.body, {
    runValidator: true,
    new: true,
  });
  res.redirect(`/products/${product._id}`);
  // console.log(req.body);
  // res.send("PUT REQUEST");
});

app.delete("/products/:id", async (req, res) => {
  const { id } = req.params;
  await Product.findByIdAndDelete(id);
  res.redirect("/products");
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Something went wrong" } = err;
  res.status(status).send(message);
});

app.listen(PORT, () => {
  console.log(`App is listening on ${PORT}`);
});
