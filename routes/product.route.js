const express = require("express");
const {
  createProduct,
  getProductById,
} = require("../controllers/product.controller");

const router = express.Router();

router.get("/:productId", getProductById);
router.post("/", createProduct);

module.exports = router;
