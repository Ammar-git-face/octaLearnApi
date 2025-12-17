const User = require("../models/User");
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
