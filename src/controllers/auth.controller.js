const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const JWT_SECRECT = 'Octalearn'

exports.signup = async (req, res) => {
    try {
        const { email, password, userName, institution, department, school,course, level, interest, phone, bio, confirmPassword} = req.body;

        if (!email || !password || !userName) {
            res.status(400).json({
                message: "email and password required"
            })
        }
        const user = await User.create({ userName, email, school, password, institution, department, course, level, interest, phone, bio, confirmPassword})
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
            // if (auth) {
                const payload = {
                    email: user.email,
                    userName: user.userName,
                    _id: user._id
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
        // }
        res.status(404).json({
            success: false,
            madd: Error
        })
    } catch (error) {
console.log(error)
        res.status(500).json({
            mad: error
        })
    }
}
