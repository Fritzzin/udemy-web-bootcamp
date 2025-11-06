const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/relationshipDB")
  .then(() => {
    console.log("CONNECTION OPEN");
  })
  .catch((err) => {
    console.log("OH NO, CONNECTION ERROR");
    console.log(err);
  });

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  season: {
    type: String,
    enum: ["Spring", "Summer", "Fall", "Winter"],
  },
});

const Product = mongoose.model("Product", productSchema);
// Product.insertMany([
//   {
//     name: "Goddess Melon",
//     price: 4.99,
//     season: "Summer",
//   },
//   {
//     name: "Sugar Baby Watermelon",
//     price: 4.99,
//     season: "Summer",
//   },
//   {
//     name: "Asparagus",
//     price: 3.99,
//     season: "Spring",
//   },
// ]);

const farmSchema = new mongoose.Schema({
  name: String,
  city: String,
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
});

const Farm = mongoose.model("Farm", farmSchema);

const makeFarm = async () => {
  const farm = new Farm({ name: "Full Belly Farm", city: "Guinda, CA" });
  const melon = await Product.findOne({ name: "Goddess Melon" });
  farm.products.push(melon);
  await farm.save();

  console.log(farm);
};

// makeFarm();

const addProduct = async () => {
  const farm = await Farm.findOne({ name: "Full Belly Farm" });
  const watermelon = await Product.findOne({ name: "Sugar Baby Watermelon" });
  farm.products.push(watermelon);
  const res = await farm.save();
  console.log(res);
};

// addProduct();

const showFarm = async () => {
  const farm = await Farm.findOne({ name: "Full Belly Farm" }).populate(
    "products"
  );
  console.log(farm);
};

showFarm();
