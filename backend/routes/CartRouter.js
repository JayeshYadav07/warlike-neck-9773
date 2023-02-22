const express = require("express");
const { CartModel } = require("../model/CartModel");
const cartRouter = express.Router();

cartRouter.get("/", async (req, res) => {
  const posts = await CartModel.find({ userId: req.body.userId });
  res.send(posts);
});

cartRouter.post("/create", async (req, res) => {
  const payload = req.body;
  try {
    const post = new CartModel(payload);
    await post.save();
    res.send({ msg: `Post created successfully`, user: payload.userId });
  } catch (error) {
    res.send({ msg: "Something went wrong", error: error.message });
  }
});

cartRouter.patch("/update/:id", async (req, res) => {
  const payload = req.body;
  try {
    await CartModel.findByIdAndUpdate(req.params.id, payload);
    res.send({ msg: `Post updated successfully` });
  } catch (error) {
    res.send({ msg: "Something went wrong", error: error.message });
  }
});

cartRouter.delete("/delete/:id", async (req, res) => {
  try {
    await CartModel.findOneAndDelete(req.params.id);
    res.send({ msg: `Post deleted successfully` });
  } catch (error) {
    res.send({ msg: "Something went wrong", error: error.message });
  }
});

module.exports = { cartRouter };
