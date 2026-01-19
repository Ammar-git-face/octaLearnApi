const express = require('express');
const { createNote, getNote } = require('../controllers/note.controller');
const router = express.Router();

router.post('/notes', createNote)
router.get('/', getNote)