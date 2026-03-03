const askaiService = require("../services/askAi.service");
const logActivity = require("../utilis/activity.log");

exports.askAi = async (req, res) => {
  try {
     const userId = req.user._id
    const { question, subject } = req.body;
   

    if (!question) {
      return res.status(400).json({ message: "Question is required" });
    }
    
    await logActivity(userId, "AI", "Asked AI a question");

    const answer = await askaiService.tutorService(question, subject);

    res.status(200).json({
      success: true,
      answer
        
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Tutor failed",
      error: err.message,
    });
    console.log(err)
  }
};
