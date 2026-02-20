const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller.js");
const middleware = require("../middlewares/authStudent.middleware");

router.get("/user/getuser/:id", userController.getUser);
router.get("/user/getAllUser", userController.getAllUser);
router.get("/user/getCharacter",middleware,userController.getCharacter);

module.exports = router;