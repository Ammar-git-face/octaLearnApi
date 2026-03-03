const express = require("express");
const router = express.Router();
<<<<<<< HEAD
const authController = require("../controllers/auth.controller");
const middlewares = require("../middleware/auth.middleware.js");
=======
const authController = require("../controllers/auth.controller.js");
>>>>>>> 4feece19e3750df76da52afad14afe050dcc189a

router.post("/auth/signup", authController.signup);
router.post("/auth/login", authController.login);


module.exports = router;
