// scripts/createAdmin.js  ← put this in your project root
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Admin = require("../src/models/Admin"); // adjust path to your Admin model

const MONGO_URI = "mongodb://localhost:27017/schoolDb";

const seedAdmin = async () => {
    await mongoose.connect(MONGO_URI);

    const existing = await Admin.findOne({ email: "amarhussaini72@gmail.com" });
    if (existing) {
        console.log("Admin already exists");
        process.exit(0);
    }

    const hashedPassword = await bcrypt.hash("OctaLearn/#/123", 10);

    await Admin.create({
        userName: "OctaAdmin",
        email: "amarhussaini72@gmail.com",
        password: hashedPassword,
        role: "admin"
    });

    console.log("✅ Admin created successfully");
    process.exit(0);
};

seedAdmin().catch((err) => {
    console.error(err);
    process.exit(1);
});