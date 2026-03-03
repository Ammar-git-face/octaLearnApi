const Activity = require("../models/Activity");

const logActivity = async (userId, type, message) => {
  try {
    await Activity.create({
      userId,
      type,
      message,
    });
  } catch (err) {
    console.error("Activity log failed:", err.message);
  }
};

module.exports = logActivity;
