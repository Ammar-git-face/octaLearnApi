const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
        
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    institution:{
        type: String,
        required:true
    },
    department: {
        type:String,
        required: true
    },
    course:{
        type: String,
        required: true
    },
    level:{
        type: String,
        enum: ['100 level', '200 level', '300 level', '400 level'],
        required: true
    },
    interest:{
        type:String,
        required: true
    },
    phone:{
        type:String,
        required: true
    },
    bio:{
        type:String,
        required:true
    },
    confirmPassword:{
        type:String,
        required: true
    }
})
userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt)
    next()
})
module.exports = mongoose.model('User', userSchema)