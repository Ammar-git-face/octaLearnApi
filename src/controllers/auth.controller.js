const User = require("../models/User");
const bcrypt = require("bcrypt");
const JWT_SECRECT = "OctalearnPro";
const jwt = require('jsonwebtoken')
exports.Signup = async (req, res) => {
  try {
    const {
      email,
      userName,
      password,
      department,
      school,
      phone,
      interest,
      course,
      bio,
      level,
    } = req.body;
    const user = await User.create({
      email,
      phone,
      userName,
      password,
      department,
      school,
      interest,
      course,
      bio,
      level,
    });
    // NEWLY ADDEDD CODE
    const payload = {
      email: user.email,
      name: user.userName
      // userName: user.userName
    };
    const token = jwt.sign(payload, JWT_SECRECT, { expiresIn: "1hr" });
    if (user) {
      res.status(200).json({
        success: true,
        message: "User created Successfully",
        user,
        token,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Could not create",
      });
    }
  } catch (error) {
    console.log(error);
  }
};
exports.Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      // const userName = await User.findOne({ userName });
      if (isMatch) {
        const payload = {
          email: user.email,
        };
        const token = jwt.sign(payload, JWT_SECRECT, { expiresIn: "1h" });
        res.status(200).json({
          success: true,
          message: "Login Successfully",
          user,
          token,
        });
      } else {
        res.status(400).json({
          success: false,
          message: "Incorrect Password",
        });
      }
    } else {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    // ⭐ NEW: Create token for login
  } catch (error) {
    console.log(error);
  }
};