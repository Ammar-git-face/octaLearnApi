const User = require("../models/User");

exports.getSettings = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateSettings = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.userId,
      req.body,
      { new: true }
    ).select("-password");

    res.json({ message: "Settings updated", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.uploadAvatar = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.userId,
      { avatar: `/uploads/${req.file.filename}` },
      { new: true }
    ).select("-password");

    res.json({
      message: "Image uploaded successfully",
      avatar: user.avatar,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
