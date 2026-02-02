const express = require('express');
const { createNote, getCharacter, getNotes } = require('../controllers/note.controller');
const authenticateStudent = require('../middlewares/authStudent.middleware');
const router = express.Router();


router.post('/notes',authenticateStudent,createNote)
router.get('/no', getNotes)
router.get('/nos', getCharacter)
module.exports = router