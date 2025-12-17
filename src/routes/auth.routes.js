const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller.js");
const middlewares = require("../middleware/auth.middleware.js");

router.post("/auth/signup", authController.Signup);
router.post("/auth/login", middlewares.authentication, authController.Login);


module.exports = router;