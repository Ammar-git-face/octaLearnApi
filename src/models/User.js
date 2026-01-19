const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const { Await } = require("react-router-dom");
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  
  userName: {
    type: String,
  },
  department: {
    type: String,
    required: true,
  },
  school: {
    type: String,
    required: true,
  },
  interest: {
    type: String,
    required: true,
  },
  course: {
    type: String,
    required: true,
  },
  Bio: {
    type: String,
  },
  phone: {
    type: String,
    required:true,
  },
 

  level: {
    type: String,
    enum:["100 level" ,"200 level" ,"300 level","400 level"],
  },
});
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

module.exports = mongoose.model("User", userSchema);
