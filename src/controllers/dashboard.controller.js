const Activity = require("../models/Activity");
const Announcement = require("../models/Announcement");
const User = require("../models/User");
const askAi = require("../models/AskAi")
const Note = require("../models/Note")
const Download = require("../models/Download")
const Connection = require("../models/Download")


exports.getDashboard = async (req, res) => {
  try {
    const userId = req.user._id;


    const aiConversations = await askAi.countDocuments({ userId: userId });
    const totalNotes = await Note.countDocuments({ userId });
    const totalDownloads = await Download.countDocuments({ userId });
    const totalConnections = await Connection.countDocuments({ userId });

    const announcement = await Announcement.find()

    const activities = await Activity.find({ userId })
      .sort({ createdAt: -1 })
      .limit(5);

    res.status(200).json({
      aiConversations,
      totalNotes,
      totalDownloads,
      totalConnections,
      activities,
      announcement
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getName = async (req, res) => {
  try {
    const name = req.user.userName;
    const derivedName = await User.findOne({ userName: name})
    if (!derivedName) {
      res.status(404).json({
        success: false,
        message: "Could not find|| not found"
      })

    }

    const username = derivedName.userName;

    const character = username.charAt()
    res.status(200).json({
      success: true,
      username,
      character
    })
  }
  catch (err) {
    res.status(500).json({
      success: false,
      error: err
    })
  }

}