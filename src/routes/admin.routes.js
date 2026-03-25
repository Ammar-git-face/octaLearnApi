const express = require("express");
const {
  getDashboardStats,
  getAllUsers,
  deleteUser,
  createAnnouncement,
  getAnalytics,
  createAdmin
} = require("../controllers/admin.controller");

const adminOnly = require("../middlewares/authAdmin.middleware");
// 
const router = express.Router();

// router.use(authenticateStudent, adminOnly); 

// Protect ALL admin routes
router.get("/admin/stats", adminOnly, getDashboardStats);
router.post("/admin/createAdmin", createAdmin);
router.get("/admin/users", adminOnly, getAllUsers);
router.delete("/admin/users/:id", adminOnly, deleteUser);

router.post("/admin/announcement", adminOnly, createAnnouncement);
router.get("/admin/analytics", adminOnly, getAnalytics);

module.exports = router;
