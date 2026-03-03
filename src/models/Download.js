const mongoose = require("mongoose");

const downloadSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  fileName: String,
}, { timestamps: true });

module.exports = mongoose.model("Download", downloadSchema);
