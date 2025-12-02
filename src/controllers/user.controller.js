const User = require("../models/User");
const bcrypt = require("bcrypt");
const JWT_SECRECT = "OctalearnPro";
//  ADDED CODE
const jwt = require("jsonwebtoken");
//creates a token for the user
const generateToken = (id) => {
   id = user._id
  return jwt.sign({ id }, "MY_SECRET_KEY_123", {
    // SECRET SHOULD LATER GO TO .env
    expiresIn: "7d", // token valid for 7 days
  });
};
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
exports.getUser = async (req, res) => {
  try {
    // const { id } = req.params/;
    const user = await User.findOne({ _id: req.params.id });
    if (user) {
      res.status(200).json({
        success: true,
        message: "User fetched",
        user,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
  } catch (error) {
    console.log(error);
  }
};
exports.getAllUser = async (req, res) => {
  try {
    const users = await User.find();
    if (users) {
      res.status(200).json({
        success: true,
        message: "fetched succcessflly",
        users,
      });
    }
  } catch (error) {
    console.log(error);
  }
};
