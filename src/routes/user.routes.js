const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller.js");
const authenticateStudent = require('../middlewares/authStudent.middleware');
router.get("/user/getuser/:id", userController.getUser);
router.get("/user/getAllUser", authenticateStudent,userController.getAllUser);

module.exports = router;


// mykey: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
