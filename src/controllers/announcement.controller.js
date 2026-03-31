const Announcement = require("../models/Announcement");
const { findById } = require("../models/User");

exports.createAnnouncement = async (req, res) => {
    console.log(req.body)
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
exports.get_announcement = async (req, res) => {
    console.log(req.body)
    try {
        const getAnnouncement = await Announcement.findById().sort({ createdAt: -1 })
        const getAll = await Announcement.countDocuments()
        res.json({
            getAnnouncement,
            getAll
        })

    } catch (err) {
        console.log(err)
    }
} 