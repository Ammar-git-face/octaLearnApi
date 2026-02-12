const express = require("express");
const router = express.Router();
const { admin } = require("../controllers/admin.controllers")

router.post("/admin" , admin);
 
module.exports = router;