const User = require("../models/User");
const Handout = require("../models/Handout");
const Announcement = require("../models/Announcement");
const Admin = require('../models/Admin')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const JWT_SECRECT = 'Octalearn'

exports.getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const activeUsers = await User.countDocuments({
      createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }
    });
    const totalHandouts = await Handout.countDocuments();
    const proUsers = await User.countDocuments({ plan: "free" });

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

exports.getAnnouncement = async (req, res) => {
  try {
    const announcements = await Announcement.find().sort({ createdAt: -1 })
      .limit(5);
    res.json(announcements);
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
exports.adminlogin = async (req, res) => {

    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({
                success: false,
                message: "email and password required"
            })
        }
        const admin = await Admin.findOne({ email: email });

        if (admin) {
            const auth = await bcrypt.compare(password, admin.password)
            if (auth) {
                const payload = {
                    email: admin.email,
                    userName: admin.userName,
                    _id: admin._id,
                    role:admin.role
                }
                const token = jwt.sign(
                    payload,
                    JWT_SECRECT,
                    { expiresIn: "7d" }
                )
                res.status(200).json({
                    message: 'Login Successfully',
                    admin,
                    token
                });
            }
            throw Error('Invalid credentials');
        }
        res.status(404).json({
            success: false,
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            mad: error
        })
    }

}


//Fam-2024-001