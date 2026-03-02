const express = require('express');
const { createNote, getCharacter, getNotes } = require('../controllers/note.controller');
const authenticateStudent = require('../middlewares/authStudent.middleware');
const router = express.Router();


router.post('/notes',authenticateStudent,createNote)
router.get('/get-note', authenticateStudent, getNotes)
router.get('/get-character', getCharacter)
module.exports = router