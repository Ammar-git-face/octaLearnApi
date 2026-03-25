const mongoose = require("mongoose");

const AskAiSchema = new mongoose.Schema({
      userId:{
            type:mongoose.Schema.Types.ObjectId, ref: 'User'
        },
    question: {
        type: String,
        required: true,
    },
    answer:{
        
        type:String
    }


    
})
module.exports = mongoose.model("AskAi", AskAiSchema);