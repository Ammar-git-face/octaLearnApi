const express = require("express");
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

module.exports = router;