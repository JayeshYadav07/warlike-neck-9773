const { ProductModel } = require("../model/ProductModel");
const express = require("express");
const productRouter = express.Router();

productRouter.get("/createProduct", async (req, res) => {
  try {
    await ProductModel.insertMany();
    res.send("Data added successfully");
  } catch (error) {
    res.send("Sorry! Something went wrong");
  }
});

module.exports = {
  productRouter,
};
