const productModel = require("../models/products.model");

module.exports = {
  createProduct: async (req, res) => {
    const product = new productModel(req.body);
    const ret = await product.save();
    res.status(201).json({
      message: "Handing POST request to /product",
      createdProduct: ret,
    });
  },

  getProductById: async (req, res) => {
    const id = req.params.productId;
    const ret = await productModel.get(id);
    if (!ret) return res.status(204).end();
    res.status(200).json(ret);
  },

  getAllProduct: async (req, res) => {
    const {
      category = "",
      brand = "",
      sort = "quantity",
      sorter = "desc",
      limit = 50,
      skip = 0,
    } = req.query;
    const ret = await productModel.list({
      category,
      brand,
      sort,
      sorter,
      limit,
      skip,
    });
    if (ret.length === 0) return res.status(204).end();
    res.status(200).json({ data: ret, count: ret.length });
  },

  removeById: async (req, res) => {
    const id = req.params.productId;
    const ret = await productModel.remove({ _id: id });
    res.status(200).json(ret);
  },

  updateProduct: async (req, res) => {
    const id = req.params.productId;
    const updateOps = {};
    for (let ops of req.body) {
      updateOps[ops.propName] = ops.value;
    }
    const ret = await productModel.update({ _id: id }, { $set: updateOps });
    res.status(200).json(ret);
  },
};
