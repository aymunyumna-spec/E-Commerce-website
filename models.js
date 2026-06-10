const mongoose = require('mongoose');

// 1. Category Schema (No Duplication Rule)
const categorySchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true, 
    unique: true, // Yeh rule duplication rokega
    trim: true 
  },
  description: { type: String }
}, { timestamps: true });

// 2. Product Schema (No Repetition Rule)
const productSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true, 
    unique: true, // Product repeat nahi ho sakega
    trim: true 
  },
  price: { type: Number, required: true },
  category: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Category', 
    required: true // Category se map hoga
  },
  subcategory: { 
    type: String, 
    required: true // Jaise apne likha "give option"
  },
  stock: { type: Number, default: 0 }
}, { timestamps: true });

const Category = mongoose.model('Category', categorySchema);
const Product = mongoose.model('Product', productSchema);

module.exports = { Category, Product };

