const mongoose = require("mongoose");

const connectionSchema = new mongoose.Schema({
  requesterName:{
    type: mongoose.Schema.Types.String,
    ref:"User"
  },

  requester: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected"],
    default: "pending",
  },
}, { timestamps: true });

module.exports = mongoose.model("Connection", connectionSchema);
