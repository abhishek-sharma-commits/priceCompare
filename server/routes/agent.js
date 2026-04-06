const express = require("express");
const router = express.Router();
const { runAgent } = require("../controllers/AgentController");
const requireAuth = require("../middleware/requireAuth");
 
// GET /api/agent/run?query=laptop+under+45k
router.get("/run", requireAuth, runAgent);


module.exports = router;