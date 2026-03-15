const express = require("express");
const router = express.Router();
const { searchProducts } = require("../controllers/compareController");

// GET /api/compare/search?query=iphone+15
router.get("/search", searchProducts);


module.exports = router;