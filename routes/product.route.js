const express = require("express");
const router = express.Router();
const porductcontroller = require("../controller/product.controller");
router.post("/", porductcontroller.createProduct); // Create Product
router.get("/", porductcontroller.getProducts); // Get All Products
router.get("/:productId", porductcontroller.getProductById); // Get Single Product
router.put("/:productId", porductcontroller.updateProduct); // Update Product
router.delete("/:productId", porductcontroller.deleteProduct); // Delete Product

module.exports = router;
