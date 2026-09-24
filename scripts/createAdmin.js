// scripts/createAdmin.js  ← put this in your project root
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Admin = require("../src/models/Admin"); // adjust path to your Admin model

const MONGO_URI = process.env.MONGO_URL || "mongodb://localhost:27017/schoolDb";

const seedAdmin = async () => {
    await mongoose.connect(MONGO_URI);

    const email = "amarhussaini72@gmail.com";
    const password = "OctaLearn/#/123";

    const existing = await Admin.findOne({ email });
    if (existing) {
        await Admin.deleteOne({ _id: existing._id });
        console.log("Existing admin record removed and will be recreated");
    }

    await Admin.create({
        userName: "OctaAdmin",
        email,
        password,
        role: "admin"
    });

    console.log("✅ Admin created successfully");
    process.exit(0);
};

seedAdmin().catch((err) => {
    console.error(err);
    process.exit(1);
});