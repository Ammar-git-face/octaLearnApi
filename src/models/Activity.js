const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  type: {
    type: String,
    enum: ["AI", "NOTE", "DOWNLOAD", "CONNECTION"],
  },
  message: {
    type: String,
  },
}, { timestamps: true });

module.exports = mongoose.model("Activity", activitySchema);
