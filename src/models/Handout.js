const mongoose = require('mongoose');

const handoutSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },

    subject: {
        type: String,
        enum: ['maths', 'english', 'chemistry', 'biology']
    },
    level: {
        type: String,
        enum: ["100 level", "200 level", "300 level", "400 level"],
    },
    fileName: {
        type:String
    }

})
module.exports = mongoose.model("Handout", handoutSchema)