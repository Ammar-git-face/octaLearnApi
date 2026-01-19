const express = require("express");
const router = express.Router();
const { askAi } = require("../controllers/askAi.controller")

router.post("/ask-ai", askAi);
 
module.exports = router;