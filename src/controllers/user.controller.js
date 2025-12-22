const User = require('../models/User')
exports.getUser = async (req, res) => {
    const userId = req.params.id;
    try {
        if (!userId) {
            res.json({
                message: 'User id is required'
            })
        }
        const user = await User.findOne({ _id: userId })
        if (user) {
            res.status(200).json({
                success: true,
                message: 'User found successfully',
                user
            })
        }
    }

    catch (error) {
        res.status(400).json({
            error: error.message
        })
    }   
}