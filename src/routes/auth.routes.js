const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller.js");
const middlewares = require("../middleware/auth.middleware.js");

router.post("/auth/signup", authController.signup);
router.post("/auth/login", authController.login);


module.exports = router;
