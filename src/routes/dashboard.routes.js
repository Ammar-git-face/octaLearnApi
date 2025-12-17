const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboard.controller')
const authMiddleware = require('../middleware/auth.middleware')

router.get('/dashboard', authMiddleware.authentication,dashboardController.dashboard)


module.exports = router