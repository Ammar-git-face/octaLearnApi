const Handout = require("../models/Handout");
const path = require("path");
const fs = require("fs");

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
    const handouts = await Handout.find();
    res.json(handouts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.downloadHandout = async (req, res) => {
  try {
    const handout = await Handout.findById(req.params.id);

    if (!handout) {
      return res.status(404).json({
        success: false,
        message: "Handout not found",
      });
    }

    const filePath = path.join(__dirname, "../uploads", handout.fileName);

    // Confirm the file actually exists on disk before attempting download
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({
        success: false,
        message: "File not found on server",
      });
    }

    // Force browser to download instead of previewing
    res.setHeader("Content-Disposition", `attachment; filename="${handout.fileName}"`);
    res.setHeader("Content-Type", "application/pdf");

    const fileStream = fs.createReadStream(filePath);

    fileStream.on("error", (err) => {
      return res.status(500).json({
        success: false,
        message: "Error reading file: " + err.message,
      });
    });

    fileStream.pipe(res);

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
exports.fetchHandoutByLevel = async (req, res) => {
  try {
    const  level  = req.params.level
    if (!level) {
      res.status(400).json({
        message: "select to fetch"
      })
    }
    const handout = await Handout.findOne({ level: level})
    res.status(200).json({
      // success: true,
      // message: 'Find successfully',
      handout
    })
  }
  catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    })
  }
}
exports.fetchHandoutBySubject = async (req, res) => {
  try {
    const subject  = req.params.subject
    if (!subject) {
      res.status(400).json({
        message: "select to fetch"
      })
    }
    const handout = await Handout.findOne({ subject: subject})
    res.status(200).json({
      handout
    })
  }
  catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    })
  }
}
exports.searchHandout = async (req, res) => {
  try {
    const { title } = req.body
    if (!title) {
      res.status(400).json({
        message: "select to fetch"
      })
    }
    const handout = await Handout.findOne({ title: title})
    res.status(200).json({
      success: true,
      message: 'Find successfully',
      handout: handout
    })
  }
  catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    })
  }
}
