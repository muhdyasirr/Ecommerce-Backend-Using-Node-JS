import bcrypt from "bcrypt";
import { adminCollection } from "../config/db.js";
import Product from "../model/productModel.js";
import Category from "../model/categoryModel.js";
import User from "../model/userModel.js";


// ---------------- ADMIN LOGIN ----------------
export const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await adminCollection.findOne({ email });
    console.log("ADMIN LOGIN ATTEMPT:", admin);

    if (!admin) {
      return res.status(400).json({ message: "Admin not found" });
    }

    if (email !== admin.email || password !== admin.password) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    req.session.admin = admin._id;
    return res.status(200).json({ message: "Admin logged in successfully" });

  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};


// ---------------- ADD CATEGORY ----------------
export const addCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res.status(400).json({ message: "Category already exists" });
    }

    const category = new Category({
      name,
      description,
    });

    await category.save();
    return res.status(200).json({ message: "Category added successfully" });

  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};


// ---------------- VIEW ALL CATEGORIES ----------------
export const viewCategory = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};


// ---------------- UPDATE CATEGORY ----------------
export const updateCategory = async (req, res) => {
  try {
    const { name, description, _id } = req.body;

    const updateData = { name, description };

    const updatedCategory = await Category.findByIdAndUpdate(_id, updateData, { new: true });

    if (!updatedCategory) return res.status(404).json({ message: "Category not found" });
    res.status(200).json(updatedCategory);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// ---------------- DELETE CATEGORY ----------------
export const deleteCategory = async (req, res) => {
  try {
    const deleted = await Category.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Category not found" });
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// ---------------- ADD PRODUCT ----------------
export const addProduct = async (req, res) => {
  try {
    const { name, description, price, categoryId } = req.body;

    if (!name || !description || !price || !categoryId) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const categoryDetails = await Category.findById(categoryId);
    if (!categoryDetails) {
      return res.status(400).json({ message: "Invalid category ID" });
    }

    const existingProduct = await Product.findOne({ name });
    if (existingProduct) {
      return res.status(400).json({ message: "Product already exists" });
    }

    const newProduct = new Product({
      name,
      description,
      price,
      category: categoryDetails._id,
    });

    await newProduct.save();
    res.status(201).json({ message: "Product added successfully", product: newProduct });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// ---------------- VIEW PRODUCT BY ID ----------------
export const viewProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("category");
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// ---------------- UPDATE PRODUCT ----------------
export const updateProduct = async (req, res) => {
  try {
    const { name, description, price, categoryId, _id } = req.body;

    const updateData = {};
    if (name) updateData.name = name;
    if (description) updateData.description = description;
    if (price) updateData.price = price;
    if (categoryId) {
      const categoryDetails = await Category.findById(categoryId);
      if (!categoryDetails) return res.status(400).json({ message: "Invalid category ID" });
      updateData.category = categoryDetails._id;
    }

    const updatedProduct = await Product.findByIdAndUpdate(_id, updateData, { new: true });
    if (!updatedProduct) return res.status(404).json({ message: "Product not found" });

    res.status(200).json(updatedProduct);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// ---------------- DELETE PRODUCT ----------------
export const deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Product not found" });
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// ---------------- GET PRODUCTS BY CATEGORY ----------------
export const getProductsByCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;

    const categoryDetails = await Category.findById(categoryId);
    if (!categoryDetails) return res.status(404).json({ message: "Category not found" });

    const products = await Product.find({ category: categoryId });
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// ---------------- GET ALL USERS ----------------
export const allUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ---------------- GET ALL PRODUCTS ----------------
export const getAllProduct = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
