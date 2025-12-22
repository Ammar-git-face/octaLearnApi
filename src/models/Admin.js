const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const adminSchema =new  mongoose.Schema({
    userName: {
        type:String,
        required: true,
        unique: true
    },
    email:{
        type:String,
        required: true,
        unique: true
    },
    password:{
        type:String,
        required: true
    }
})
adminSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt)
    next()
})
module.exports = mongoose.model('Admin', adminSchema)