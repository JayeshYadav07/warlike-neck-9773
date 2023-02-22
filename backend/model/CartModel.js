const mongoose = require("mongoose");
const cartSchema = new mongoose.Schema({
  userID: { type: String },
  title: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  desc: { type: String, required: true },
  qty: { type: Number, required: true },
});
const CartModel = mongoose.model("cart", cartSchema);
module.exports = { CartModel };
