const mongoose = require("mongoose");
const createError = require("http-errors");

const productSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  category: {
    type: String,
    require: true,
  },
  brand: {
    type: String,
    require: true,
  },
  price: {
    type: Number,
    require: true,
  },
  quantity: {
    type: Number,
    require: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

productSchema.statics = {
  /**
   * Get product.
   * @param {ObjectId} id - The objectId of procduct
   * @return {Object}
   */
  get: async (id) => {
    const ret = await Product.findById(id);
    if (!ret) {
      throw new createError(204, "Not found product");
    }
    return ret;
  },

  /**
   * List products in descending order of 'createAt' timestamp.
   * @param {Number} skip - Number of products to be skipped
   * @param {Number} limit - Limit number of products to be returned
   * @return {Array}
   */
  list: async ({
    category = "",
    brand = "",
    sort = "quantity",
    sorter = "desc",
    skip = 0,
    limit = 50,
  } = {}) => {
    let condition = {};
    if (category) condition.category = category;
    if (brand) condition.brand = brand;
    const soringOrder = sorter === "desc" ? -1 : 1;
    const ret = await Product.find(condition)
      .sort({ [sort]: soringOrder })
      .skip(+skip)
      .limit(+limit);
    if (!ret) throw createError(204, "Not found products");
    return ret;
  },
};

const Product = mongoose.model("product", productSchema);
module.exports = Product;
