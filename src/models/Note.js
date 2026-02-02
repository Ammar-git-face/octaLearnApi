const mongoose = require('mongoose')
const noteSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId, ref: 'User'
    },
    title:{
        type:String,
        required: true

    },
    content:{
        type:String,

    },
    characterCount:{
        type:Number,
    },
})
module.exports = mongoose.model("Notee", noteSchema);