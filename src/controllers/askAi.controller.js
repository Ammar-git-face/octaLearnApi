const askaiService = require("../services/askAi.service");
const logActivity = require("../utilis/activity.log");
const AskAi = require('../models/AskAi');

exports.askAi = async (req, res) => {
  try {
    const userId = req.user._id;
    const { question, subject } = req.body;
    const cleanQuestion = typeof question === "string" ? question.trim() : "";
    const cleanSubject = typeof subject === "string" ? subject.trim() : "";

    if (!cleanQuestion) {
      return res.status(400).json({ message: "Question is required" });
    }

    await logActivity(userId, "AI", "Asked AI a question");
    const answer = await askaiService.tutorService(cleanQuestion, cleanSubject);
    await AskAi.create({ question: cleanQuestion, answer, userId });

    res.status(200).json({
      success: true,
      answer,
      markdown: true
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Tutor failed",
      error: err.message,
    });
  }
};
