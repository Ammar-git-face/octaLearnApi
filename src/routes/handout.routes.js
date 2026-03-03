const express = require('express');
const router = express.Router();
const upload = require("../middlewares/upload.middleware");
const handout = require("../controllers/handouts.controller");


router.post('/handout', upload.single("img"), handout.createHandout)

module.exports = router