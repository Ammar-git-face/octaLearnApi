const mongoose = require('mongoose');
const Message = require('../models/Message');

exports.sendMessage = async (req, res) => {
    try {
        const { recipientId, content } = req.body;

        if (!recipientId || !content) {
            return res.status(400).json({
                success: false,
                message: "recipientId and content are required"
            });
        }

        if (recipientId === req.user._id.toString()) {
            return res.status(400).json({
                success: false,
                message: "You cannot send message to yourself"
            });
        }

        const message = new Message({
            sender: req.user._id,
            recipient: recipientId,
            content
        });

        await message.save();

        req.io.to(recipientId).emit("newMessage", message);

        res.status(201).json({
            success: true,
            message
        });

    } catch (error) {
        console.log("SEND MESSAGE ERROR:", error);
        res.status(500).json({ error: error.message });
    }
};

exports.getConversation = async (req, res) => {
    try {
        const myId = new mongoose.Types.ObjectId(req.user._id);
        const otherUserId = new mongoose.Types.ObjectId(req.params.userId);

        const messages = await Message.find({
            $or: [
                { sender: myId, recipient: otherUserId },
                { sender: otherUserId, recipient: myId }
            ]
        }).sort({ timestamp: 1 });

        res.status(200).json({
            success: true,
            count: messages.length,
            messages
        });

    } catch (error) {
        console.log("GET MESSAGE ERROR:", error);
        res.status(500).json({ error: error.message });
    }
};
