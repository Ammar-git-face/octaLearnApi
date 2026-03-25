const Connection = require("../models/Connection");

// SEND REQUEST
exports.sendRequest = async (req, res) => {
  try {
    const { userId } = req.body;

    const exists = await Connection.findOne({
      $or: [
        { requester: req.user._id, recipient: userId },
        { requester: userId, recipient: req.user._id }
      ]
    });

    if (exists) {
      return res.status(400).json({ message: "Already exists" });
    }

    const connection = await Connection.create({
      requester: req.user._id,
      requesterName: req.user.userName,
      recipient: userId
    });

    req.io.to(userId).emit("notification", {
      type: "request",
      message: `${req.user.userName} sent you a request`
    });

    res.json({ success: true, connection });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// RESPOND REQUEST
exports.respondRequest = async (req, res) => {
  try {
    const { requestId, action } = req.body;

    const request = await Connection.findOneAndUpdate(
      { _id: requestId, recipient: req.user._id },
      { status: action },
      { new: true }
    ).populate("requester");

    req.io.to(request.requester._id.toString()).emit("notification", {
      type: "connection",
      message: `${req.user.userName} ${action} your request`
    });

    res.json({ success: true, request });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// GET REQUESTS
exports.getRequests = async (req, res) => {
  const requests = await Connection.find({
    recipient: req.user._id,
    status: "pending"
  }).populate("requester", "userName");

  res.json(requests);
};


// GET CHATS
exports.getChats = async (req, res) => {
  const connections = await Connection.find({
    status: "accepted",
    $or: [
      { requester: req.user._id },
      { recipient: req.user._id }
    ]
  }).populate("requester recipient", "userName department");

  const users = connections.map(c =>
    c.requester._id.toString() === req.user._id.toString()
      ? c.recipient
      : c.requester
  );

  res.json(users);
};