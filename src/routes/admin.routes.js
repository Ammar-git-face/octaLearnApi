const express = require("express");
<<<<<<< HEAD
const router = express.Router();
const { admin } = require("../controllers/admin.controllers")

router.post("/admin" , admin);
 
=======
const {
  getDashboardStats,
  getAllUsers,
  deleteUser,
  createAnnouncement,
  getAnalytics
} = require("../controllers/adminController");

const { protect, adminOnly } = require("../middleware/authMiddleware");

const router = express.Router();

router.use(protect, adminOnly); // Protect ALL admin routes

router.get("/stats", getDashboardStats);
router.get("/users", getAllUsers);
router.delete("/users/:id", deleteUser);

router.post("/announcement", createAnnouncement);
router.get("/analytics", getAnalytics);

>>>>>>> 4feece19e3750df76da52afad14afe050dcc189a
module.exports = router;