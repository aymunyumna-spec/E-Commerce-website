const express = require('express');
const mongoose = require('mongoose');
const { Category, Product } = require('./models');

const app = express();
app.use(express.json()); // JSON data read karne ke liye

// MongoDB Connection (Client apni URL yahan dale ga)
const MONGO_URI = "mongodb://localhost:27017/ecommerce_db"; 
mongoose.connect(MONGO_URI)
  .then(() => console.log("MongoDB Connected Successfully!"))
  .catch(err => console.log("Database Connection Error:", err));

// ==========================================
// 1. CATEGORY APIS (Add & Delete) da289ca3-068e-4889-b4b6-242b933446fc
// ==========================================

// Nayi Category Add karne ke liye
app.post('/api/categories', async (req, res) => {
  try {
    const { name, description } = req.body;
    const newCategory = new Category({ name, description });
    await newCategory.save();
    res.status(201).json({ success: true, message: "Category added successfully!", data: newCategory });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ success: false, message: "This category already exists! (No Duplication Allowed)" });
    }
    res.status(500).json({ success: false, message: error.message });
  }
});

// Category Delete karne ke liye da289ca3-068e-4889-b4b6-242b933446fc
app.delete('/api/categories/:id', async (req, res) => {
  try {
    const deletedCategory = await Category.findByIdAndDelete(req.params.id);
    if (!deletedCategory) {
      return res.status(404).json({ success: false, message: "Category not found!" });
    }
    res.status(200).json({ success: true, message: "Category deleted successfully!" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Saari Categories dekhne ke liye
app.get('/api/categories', async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json({ success: true, data: categories });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ==========================================
// 2. PRODUCT APIS (With Subcategory) da289ca3-068e-4889-b4b6-242b933446fc
// ==========================================

// Naya Product Add karne ke liye
app.post('/api/products', async (req, res) => {
  try {
    const { name, price, categoryId, subcategory, stock } = req.body;
    
    const newProduct = new Product({
      name,
      price,
      category: categoryId,
      subcategory,
      stock
    });

    await newProduct.save();
    res.status(201).json({ success: true, message: "Product added successfully!", data: newProduct });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ success: false, message: "Product already exists! (No Repetition Allowed)" });
    }
    res.status(500).json({ success: false, message: error.message });
  }
});

// Server Port
// Server Port (Vercel automatic port assign karega)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

// Yeh line Vercel ke liye lazmi hai
module.exports = app;


