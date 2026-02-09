const mongoose = require("mongoose");

const AskAiSchema = new mongoose.Schema({
    chat: {
        type: Strings,
        required: true,
    },


})
module.exports = mongoose.model("AskAi", AskAiSchema);