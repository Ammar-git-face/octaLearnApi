const mongoose = require('mongoose');
const Message = require('../models/Message');

exports.sendMessage = async (req, res) => {
  try {
    const { recipientId, content } = req.body;

    const message = await Message.create({
      sender: req.user._id,
      recipient: recipientId,
      content
    });

    req.io.to(recipientId).emit("newMessage", message);
    req.io.to(recipientId).emit("notification", {
      type: "message",
      message: `New message from ${req.user.userName}`
    });

    res.json({ success: true, message });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getConversation = async (req, res) => {
  const myId = new mongoose.Types.ObjectId(req.user._id);
  const otherId = new mongoose.Types.ObjectId(req.params.userId);

  const messages = await Message.find({
    $or: [
      { sender: myId, recipient: otherId },
      { sender: otherId, recipient: myId }
    ]
  }).sort({ timestamp: 1 });

  res.json({ success: true, messages });
};