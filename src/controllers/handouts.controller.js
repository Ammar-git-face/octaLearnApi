const Handout = require("../models/Handout");
exports.createHandout = async (req, res) => {
  try {
    const { title, content, subject, level } = req.body;

    const fileName = req.file.filename;

    if (!title || !content || !subject || !level || !fileName) {
      return res.status(400).json({
        success: false,
        message: "All fields must be filled",
      });
    }

    const handout = await Handout.create({
      title,
      content,
      subject,
      level,
      fileName,
    });
    res.status(201).json({
      success: true,
      message: "Created successfully",
      handout,
    });
  } catch (error) {
    console.log(error.message)
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
exports.deleteHandout = async (req, res) => {
  try {
    await Handout.findByIdAndDelete(req.params.id);
    res.json({ message: "Handout deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.getHandouts = async (req, res) => {
  try {
    const handouts = await Handout.find().sort({ createdAt: -1 });
    res.json(handouts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
