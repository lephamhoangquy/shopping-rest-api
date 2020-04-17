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
      res.status(500).json({ error });
    }
  },

  getProductById: async (req, res) => {
    const id = req.params.productId;
    try {
      const ret = await productModel.findById(id);
      if (ret) {
        res.status(200).json(ret);
      }
    } catch (error) {
      res.status(500).json({ error });
    }
  },
};
