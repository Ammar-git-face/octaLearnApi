const express = require('express');
const router = express.Router();
const upload = require("../middlewares/uploadFile.middleware");
const handout = require("../controllers/handouts.controller");
// const authorise = require("../middlewares/authorise.middleware")
const authenticate = require("../middlewares/authStudent.middleware")

// router.use(authorise, authenticate)
router.post(
    "/admin/handout",
    upload.single("file"),
    handout.createHandout
);
router.get('/admin/get-handout', handout.getHandouts)

module.exports = router