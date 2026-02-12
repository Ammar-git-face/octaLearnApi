const express = require("express");
const router = express.Router();
const auth = require("../middlewares/authStudent.middleware");
const {
    getSettings,
    updateSettings,
} = require("../controllers/settings.controller");
const upload = require("../middlewares/upload.middleware");
const { uploadAvatar } = require("../controllers/settings.controller");

router.post("/avatar", auth, upload.single("avatar"), uploadAvatar);
router.get("/", auth, getSettings);
router.put("/", auth, updateSettings);

module.exports = router;
