const express = require("express");
const {
  createProduct,
  getProductById,
  getAllProduct,
  removeById,
  updateProduct,
} = require("../controllers/product.controller");

const router = express.Router();

router.get("/", getAllProduct);
router.get("/:productId", getProductById);
router.post("/", createProduct);
router.delete("/:productId", removeById);
router.patch("/:productId", updateProduct);

module.exports = router;
