const express = require('express');
const authenticateStudent = require('../middlewares/authStudent.middleware');
const { sendMessage, getConversation } = require('../controllers/message.controller');

const router = express.Router();

router.post('/send-message', authenticateStudent, sendMessage);
router.get('/get-message/:userId', authenticateStudent, getConversation);

module.exports = router;
