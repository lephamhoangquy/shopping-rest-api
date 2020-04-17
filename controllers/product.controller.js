const productModel = require("../models/products.model");
const mongoose = require("mongoose");

module.exports = {
  createProduct: async (req, res) => {
    const { name, price } = req.body;
    const product = new productModel({
      _id: mongoose.Types.ObjectId(),
      name,
      price,
    });
    try {
      const ret = await product.save();
      if (ret) {
        res.status(201).json({
          message: "Handing POST request to /product",
          createdProduct: ret,
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error });
    }
  },

  getProductById: async (req, res) => {
    const id = req.params.productId;
    try {
      const ret = await productModel.findById(id);
      if (ret) {
        res.status(200).json(ret);
      } else {
        res.status(404).json({
          message: "No invaild entry found for provided ID",
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error });
    }
  },

  getAllProduct: async (req, res) => {
    try {
      const ret = await productModel.find();
      if (ret.length > 0) {
        res.status(200).json(ret);
      } else {
        res.status(404).json({
          message: "No entries found",
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error });
    }
  },

  removeById: async (req, res) => {
    const id = req.params.productId;
    try {
      const ret = await productModel.remove({ _id: id });
      if (ret) {
        res.status(200).json(ret);
      } else {
        res.status(404).json({
          message: "remove not successfully",
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error });
    }
  },

  updateProduct: async (req, res) => {
    const id = req.params.productId;
    const updateOps = {};
    for (let ops of req.body) {
      updateOps[ops.propName] = ops.value;
    }
    try {
      const ret = await productModel.update({ _id: id }, { $set: updateOps });
      res.status(200).json(ret);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error });
    }
  },
};
