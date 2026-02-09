const Connection = require("../models/Connection");

exports.sendRequest = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "User ID required" });
    }

    if (userId === req.user._id.toString()) {
      return res.status(400).json({ message: "Cannot connect to yourself" });
    }

    const exists = await Connection.findOne({
      $or: [
        { requester: req.user._id, recipient: userId },
        { requester: userId, recipient: req.user._id }
      ]
    });

    if (exists) {
      return res.status(400).json({ message: "Request already exists" });
    }

    const connection = await Connection.create({
      requester: req.user._id,
      recipient: userId
    });

    res.status(201).json({
      success: true,
      message: "Request sent",
      connection
    });

  } catch (error) {
    console.log("SEND REQUEST ERROR:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.getRequests = async (req, res) => {
  try {
    const requests = await Connection.find({
      recipient: req.user._id,
      status: "pending"
    }).populate("requester", "name department");

    res.json(requests);

  } catch (error) {
    console.log("GET REQUEST ERROR:", error);
    res.status(500).json({ error: error.message });
  }
};


exports.respondRequest = async (req, res) => {
  try {
    const { requestId, action } = req.body;

    if (!["accepted", "rejected"].includes(action)) {
      return res.status(400).json({ message: "Invalid action" });
    }

    const request = await Connection.findOneAndUpdate(
      { _id: requestId, recipient: req.user._id },
      { status: action },
      { new: true }
    );

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    res.json({ success: true, request });

  } catch (error) {
    console.log("RESPOND ERROR:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.getChats = async (req, res) => {
  try {
    const connections = await Connection.find({
      status: "accepted",
      $or: [
        { requester: req.user._id },
        { recipient: req.user._id }
      ]
    }).populate("requester recipient", "name department");

    const users = connections.map((c) =>
      c.requester._id.toString() === req.user._id.toString()
        ? c.recipient
        : c.requester
    );

    res.json(users);

  } catch (error) {
    console.log("GET CHATS ERROR:", error);
    res.status(500).json({ error: error.message });
  }
};
