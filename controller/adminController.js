

import bcrypt from "bcrypt"
import { adminCollection, CategoeryCollection } from "../config/db.js";
import Product from "../models/productModel.js"; 
import categoery from "../models/categoeryModel.js";
import User from "../models/userModel.js";




//login
export const adminlogin= async (req,res)=>{
  const {email,password}=req.body
  try{
    const admin= await adminCollection.findOne({email})
    console.log("ADMIN LOGGED SUCEESFULLY", admin);
    
    if(!admin){
      return res.status(400).json({message:"Admin Not Found"})
    }
    
    if(!email == admin.email && password == admin.password){
      return res.status(400).json({message:"Admin Password Is Wrong "})
    }
    req.session.admin=admin._id
    return res.status(200).json({message:"Admin Logined"})

  }catch (error) {
    console.log(error.message);
  }

}


//admin add Categoery 
export const addCategoery=async (req,res)=>{
  try{
     const {name,description}=req.body



   const existingCategoery = await categoery.findOne({ name });

    if (existingCategoery) {
      return res.status(400).json({ message: "Category already exists" });
    }

     

   const categoeries=new categoery({
    name:name,
    description:description
   })
   await categoeries.save()
   return res.status(200).json({message:"Categoery added Suceesfully "})
  }catch (error) {
    console.log(error.message);
  }

}

//admin view all Categoery
export const viewCategoery = async (req, res) => {
  try {
    const categories = await categoery.find();
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

//update  Categoery

export const updateCategoery= async (req,res)=>{
  try{
    const{name,description,_id}=req.body
   const updateData = {};
 updateData.name = name;
   updateData.description = description;

    const updatedCategory = await categoery.findByIdAndUpdate(
      _id,
      updateData,
      { new: true } 
    );

   if (!updatedCategory) return res.status(404).json({ message: "Category not found" });
    res.status(200).json(updatedCategory);
  }
   catch (err) {
    res.status(500).json({ message: err.message });
  }
}


//delete categoery

export const deleteCategory = async (req, res) => {
  try {
    const deleted = await categoery.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Category not found" });
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};




//product




// Add Product
export const addProduct = async (req, res) => {
  try {
    const { name, description, price, categoryId } = req.body;

    // Check all fields
    if (!name || !description || !price || !categoryId) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if category exists
    const categoryDetails = await categoery.findById(categoryId);
    if (!categoryDetails) {
      return res.status(400).json({ message: "Invalid category ID" });
    }

    // Check if product exists
    const existingProduct = await Product.findOne({ name });
    if (existingProduct) {
      return res.status(400).json({ message: "Product already exists" });
    }

    const newProduct = new Product({
      name,
      description,
      price,
      category: categoryDetails._id
    });

    await newProduct.save();
    res.status(201).json({ message: "Product added successfully", product: newProduct });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// View Product by ID
export const viewProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("category");
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update Product
export const updateProduct = async (req, res) => {
  try {
    const { name, description, price, categoryId, _id } = req.body;

    const updateData = {};
    if (name) updateData.name = name;
    if (description) updateData.description = description;
    if (price) updateData.price = price;
    if (categoryId) {
      const categoryDetails = await categoery.findById(categoryId);
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

// Delete Product
export const deleteProduct = async (req, res) => {
 
  
  
  
  try {
     const deleted = await Product.findByIdAndDelete(req.params.id);
   if (!deleted) return res.status(404).json({ message: "Product not found" });
res.status(200).json({ message: "Product deleted successfully" });
 } catch (err) {
   res.status(500).json({ message: err.message });
 }
};

// Get Products by Category
export const getProductsByCategory = async (req, res) => {

  try {
    const categoryId = req.params.id;

    const categoryDetails = await categoery.findById(categoryId);
    if (!categoryDetails) return res.status(404).json({ message: "Category not found" });

    const products = await Product.find({ category: categoryId });
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


//ALL USERS

export const allUsers=async(req,res)=>{
  try{
    const Users= await User.find()
    res.status(200).json(Users)
  }catch(error){
    res.status(500).json({ message: err.message });
    
  }
}


export const getAllproduct=async(req,res)=>{
  const products= await Product.find()
   res.status(200).json(products)
}


