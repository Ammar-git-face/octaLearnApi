const User = require("../models/User");
exports.getUser = async (req, res) => {
  try {
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
exports.updateUser = async(req, res) => {
  try {
    const user = User.findById(req.params.user_id)
    if (!user) {
      res.status(404).json({
        success: false,
        message: "user not found",
      })
    }
    await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    res.status(200).json({
      success: true,
      message: "user updated successfully",
    })
  }
  catch (error) {
    res.status(400).json({
      message: error
    })
  }
}