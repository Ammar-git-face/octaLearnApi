const express = require("express");
const router = express.Router();
const auth = require("../middlewares/authStudent.middleware");

const {
  sendRequest,
  getRequests,
  respondRequest,
  getChats
} = require("../controllers/connection.controller");

router.post("/connect", auth, sendRequest);
router.get("/requests", auth, getRequests);
router.post("/respond", auth, respondRequest);
router.get("/chats", auth, getChats);

module.exports = router;
