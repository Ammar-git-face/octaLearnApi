const express = require('express');
const router = express.Router();
const upload = require("../middlewares/uploadFile.middleware");
const handout = require("../controllers/handouts.controller");
// const authorise = require("../middlewares/authorise.middleware")
const authenticate = require("../middlewares/authStudent.middleware")

const adminOnly = require("../middlewares/authAdmin.middleware");
// router.use(authorise, authenticate)
router.post(
    "/admin/handout",
    upload.single("file"),adminOnly,
    handout.createHandout
);
router.get('/admin/get-handout', handout.getHandouts)
router.get('/admin/find-handout-by-level/:level', handout.fetchHandoutByLevel)
router.get('/admin/find-handout-by-subject/:subject', handout.fetchHandoutBySubject)
router.get('/admin/find-handout-by-title', handout.searchHandout)


module.exports = router