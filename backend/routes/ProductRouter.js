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
productRouter.get("/get", async (req, res) => {
    try {
        let data = await ProductModel.find(req.query);
        res.send(data);
    } catch (error) {
        res.send("Sorry! Something went wrong");
    }
});
productRouter.get("/get/priceSlash", async (req, res) => {
    try {
        let data = await ProductModel.find().sort({ price: 1 }).limit(4);
        res.send(data);
    } catch (error) {
        res.send("Sorry! Something went wrong");
    }
});
productRouter.get("/get/pickDay", async (req, res) => {
    try {
        let data = await ProductModel.find().sort({ reviews: 1 }).limit(4);
        res.send(data);
    } catch (error) {
        res.send("Sorry! Something went wrong");
    }
});
productRouter.get("/get/topDeals", async (req, res) => {
    try {
        let data = await ProductModel.find().sort({ discount: -1 }).limit(4);
        res.send(data);
    } catch (error) {
        res.send("Sorry! Something went wrong");
    }
});

module.exports = {
    productRouter,
};
