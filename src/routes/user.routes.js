const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller.js");
<<<<<<< HEAD
const middleware = require("../middlewares/authStudent.middleware");

router.get("/user/getuser/:id", userController.getUser);
router.get("/user/getAllUser", userController.getAllUser);
router.get("/user/getCharacter",middleware,userController.getCharacter);

module.exports = router;
=======
const authenticateStudent = require('../middlewares/authStudent.middleware');
router.get("/user/getuser/:id", userController.getUser);
router.get("/user/getAllUser", authenticateStudent,userController.getAllUser);

module.exports = router;



//mykey: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
>>>>>>> 4feece19e3750df76da52afad14afe050dcc189a
