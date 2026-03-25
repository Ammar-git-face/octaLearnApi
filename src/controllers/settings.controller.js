const User = require("../models/User");

// ================= GET SETTINGS =================
exports.getSettings = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ================= UPDATE SETTINGS =================
exports.updateSettings = async (req, res) => {
  try {
    const updateData = { ...req.body };

    // Ensure interests is always array
    if (updateData.interests && !Array.isArray(updateData.interests)) {
      updateData.interests = updateData.interests
        .split(",")
        .map((i) => i.trim());
    }

const user = await User.findOneAndUpdate(
  { _id: req.user._id },
  updateData,
  { new: true, runValidators: true }
).select("-password");

if (!user) {
  return res.status(404).json({ error: "User not found" });
}

    res.json({
      message: "Settings updated successfully",
      user,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ================= UPLOAD AVATAR =================
exports.uploadAvatar = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { avatar: `/uploads/${req.file.filename}` },
      { new: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({
      message: "Image uploaded successfully",
      avatar: user.avatar,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};