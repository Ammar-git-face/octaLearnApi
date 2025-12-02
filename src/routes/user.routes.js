const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller.js");
const middlewares = require("../middleware/auth.middleware.js");

router.post("/user/signup", userController.Signup);
router.post("/user/login", middlewares.authentication, userController.Login);
router.get("/user/getuser/:id", userController.getUser);
router.get("/user/getAllUser", userController.getAllUser);

module.exports = router;
