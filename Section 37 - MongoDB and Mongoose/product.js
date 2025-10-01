const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/shopApp")
  .then(() => {
    console.log("Connection Open!");
  })
  .catch((err) => {
    console.log("Connection Error!");
    console.log(err);
  });

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxLength: 20,
  },
  price: {
    type: Number,
    required: true,
    min: [0, "Price must be positive"],
  },
  onSale: {
    type: Boolean,
    default: false,
  },
  // in between [] means an array
  categories: [String],
  qty: {
    online: { type: Number, default: 0 },
    inStore: { type: Number, default: 0 },
  },
  size: {
    type: String,
    enum: ["S", "M", "L"],
  },
});

productSchema.methods.greet = function () {
  console.log("Hello!!!");
  console.log(`- from ${this.name}`);
};

productSchema.methods.toggleOnSale = function () {
  this.onSale = !this.onSale;
  return this.save();
};

productSchema.methods.addCategory = function (newCategory) {
  this.categories.push(newCategory);
  return this.save();
};

productSchema.statics.fireSale = function () {
  return this.updateMany({}, { onSale: true, price: 0 });
};

const Product = mongoose.model("Product", productSchema);

// Product.fireSale().then((res) => console.log(res));

// const findProduct = async () => {
//   const foundProduct = await Product.findOne({ name: "Tire Pump" });
//   console.log(foundProduct);
//   // await foundProduct.toggleOnSale();
//   // await foundProduct.addCategory('Pump');
//   console.log(foundProduct);
// };
// findProduct();

// const bike = new Product({
//   name: "Tire Pump",
//   price: 20,
//   categories: ["Cycling"],
//   size: "S",
// });

// bike
//   .save()
//   .then((data) => {
//     console.log("Product saved!");
//     console.log(data);
//   })
//   .catch((err) => {
//     console.log("Error while saving product");
//     console.log(err);
//   });

// By default, on update, mongoose doesn't apply validations
// Product.findOneAndUpdate(
//   { name: "Tire Pump" },
//   { price: 19.99 },
//   { new: true, runValidators: true }
// )
//   .then((data) => {
//     console.log("Product updated!");
//     console.log(data);
//   })
//   .catch((err) => {
//     console.log("Error while updating product");
//     console.log(err);
//   });
