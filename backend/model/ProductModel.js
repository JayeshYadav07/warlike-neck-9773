const mongoose = require("mongoose");
const ProductSchema = mongoose.Schema({
  name: String,
  price: Number,
  image: String,
  rating: Number,
});

const ProductModel = mongoose.model("product", ProductSchema);
module.exports = {
  ProductModel,
};
