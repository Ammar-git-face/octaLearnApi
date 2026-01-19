const mongoose = require('mongoose')
const noteSchema = new mongoose.Schema({
    userId:{
        type:String
    },
    content:{
        type:String
    },
    characterCount:{
        type:Number
    },
})
module.exports = mongoose.model("Notee", noteSchema);