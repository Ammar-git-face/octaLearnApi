const askaiService = require("../services/askAi.service");

exports.askAi = async (req, res) => {
  try {
    const { question, subject } = req.body;

    if (!question) {
      return res.status(400).json({ message: "Question is required" });
    }

    const answer = await askaiService.tutorService(question, subject);

    res.status(200).json({
      success: true,
      answer
        
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Tutor failed",
      error: err,
    });
    console.log(err)
  }
};
