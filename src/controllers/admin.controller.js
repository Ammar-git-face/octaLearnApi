const User = require("../models/User");
const Handout = require("../models/Handout");
const Announcement = require("../models/Announcement");
const Admin = require('../models/Admin')
exports.getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const activeUsers = await User.countDocuments({
      createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }
    });
    const totalHandouts = await Handout.countDocuments();
    const proUsers = await User.countDocuments({ plan: "pro" });

    res.json({
      totalUsers,
      activeUsers,
      totalHandouts,
      proUsers
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createAnnouncement = async (req, res) => {
  try {
    const { title, content } = req.body;

    const announcement = await Announcement.create({
      title,
      content
    });

    res.status(201).json(announcement);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAnalytics = async (req, res) => {
  try {
    const userGrowth = await User.aggregate([
      {
        $group: {
          _id: { $month: "$createdAt" },
          count: { $sum: 1 }
        }
      }
    ]);

    const popularContent = await Handout.find()
      .sort({ downloads: -1 })
      .limit(5);

    res.json({ userGrowth, popularContent });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.createAdmin = async (req, res) => {
  try {
    const { email, userName, password, role } = req.body;

    if (role === 'user' || !email || !userName || !password || !role) {
      return res.status(403).json({ message: "Forbidden: You are not allow" })
    }
    const admin = await Admin.create({ email, userName, password, role })
    if (admin) {
      res.status(201).json({
        success: true,
        message: "Admin created successfully",
        admin
      })
    }
  }
  catch (err) {
    console.log(err)
    res.status(400).json({
      success: false,
      message: err.message
    })
  }
}
exports.adminLogin

//Fam-2024-001