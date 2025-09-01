const Product = require("../models/product.model");

const createProduct = async (req, res) => {
  try {
    const { name, price, stock } = req.body;

    if (!name || !price || !stock) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    const product = new Product({ name, price, stock });
    await product.save();

    res.status(201).json({ msg: "Product created successfully", product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res
      .status(200)
      .json({ msg: "Product list retrieved successfully", products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }
    res.status(200).json({ msg: "Product retrieved successfully", product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { name, price, stock } = req.body;
    const product = await Product.findByIdAndUpdate(
      req.params.productId,
      { name, price, stock },
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }

    res.status(200).json({ msg: "Product updated successfully", product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.productId);
    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }

    res.status(200).json({ msg: "Product deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
