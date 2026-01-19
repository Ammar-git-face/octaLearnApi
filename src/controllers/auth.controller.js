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
const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.signup = async () => {
    try {
        const { email, password, userName, institution, department, course, level, interest, phone, bio, confirmPassword} = req.body;

        if (!email || !password || !userName) {
            res.status(400).json({
                message: "email and password required"
            })
        }
        const user = await User.create({ userName, email, password, institution, department, course, level, interest, phone, bio, confirmPassword})
        res.status(201).json({
            message: "User created Successfully",
            user
        })

    } catch (error) {
        res.status(500).json({
            message: "This Email has already been taken",
        })
        console.log(error)
    }
}
exports.login = async (req, res) => {

    try {
        const { email, password, } = req.body;
        const user = await User.findOne({ email });

        if (user) {
            const auth = await bcrypt.compare(password, user.password)
            if (auth) {
                const payload = {
                    email: user.email,
                    userName: user.userName
                }
                const token = jwt.sign(
                    payload,
                    JWT_SECRECT,
                    { expiresIn: "1h" }
                )
                res.status(200).json({
                    message: 'Login Successfully',
                    user,
                    token
                });
            }
            throw Error('Incorrect Password');
        }
        res.status(404).json({
            success: false,
            error: Error
        })
    } catch (error) {

        res.status(500).json({
            Error: error
        })
    }
}
