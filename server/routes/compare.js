const express = require("express");
const router = express.Router();
const { searchProducts } = require("../controllers/compareController");
const requireAuth = require("../middleware/requireAuth");
 
// GET /api/compare/search?query=iphone+15
router.get("/search", requireAuth, searchProducts);


module.exports = router;