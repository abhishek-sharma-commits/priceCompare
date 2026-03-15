const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: String,
  price: String,
  originalPrice: String,
  discount: String,
  rating: String,
  reviewCount: String,
  availability: String,
  deliveryInfo: String,
  imageUrl: String,
  productUrl: String,
  specs: [String],
});

const SearchCacheSchema = new mongoose.Schema({
  query: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  amazon: [ProductSchema],
  flipkart: [ProductSchema],
  createdAt: {
    type: Date,
    default: Date.now,
    // Auto-expire cache after 30 minutes
    expires: 1800,
  },
});

module.exports = mongoose.model("SearchCache", SearchCacheSchema);