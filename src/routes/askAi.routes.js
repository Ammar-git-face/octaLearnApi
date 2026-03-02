const express = require("express");
const router = express.Router();
const { askAi } = require("../controllers/askAi.controller")
const middleware = require('../middlewares/authStudent.middleware')

router.post("/ask-ai", middleware,askAi);
 
module.exports = router;