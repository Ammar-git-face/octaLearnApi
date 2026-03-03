const Announcement = require("../models/Announcement");

exports.createAnnouncement = async (req, res) => {
    try {
        const { title, content } = req.body;
        if (!title || !content) {
            res.status(400).json({
                success: false,
                message: "A title and content must be given"
            })
        }
        const announcement = await Announcement.create({
            title,
            content
        })
        if (announcement) {
            res.status(201).json({
                success: true,
                message: "announcement created successfully",
                announcement
            })
        }
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error
        })
    }
}