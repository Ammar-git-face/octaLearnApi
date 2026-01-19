const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller.js");

router.get("/user/getuser/:id", userController.getUser);
router.get("/user/getAllUser", userController.getAllUser);

module.exports = router;
