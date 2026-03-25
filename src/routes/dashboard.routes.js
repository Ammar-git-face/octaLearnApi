const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboard.controller')
const authMiddleware = require('../middlewares/authStudent.middleware')
// const middleware = require('../middlewares/authStudent.middleware')

router.get('/dashboard', authMiddleware,dashboardController.getDashboard)
router.get('/getname', authMiddleware, dashboardController.getName)


module.exports = router