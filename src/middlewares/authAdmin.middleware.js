const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const JWT_SECRET = "Octalearn";

const authenticateAdmin = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "No token provided" });
        }
        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, JWT_SECRET);
        const admin = await Admin.findById(decoded.id || decoded._id).select("-password");
        if (!admin) {
            return res.status(401).json({ message: "Admin not found" });
        }

        req.admin = admin;
        if (req.admin.role !== 'admin') {
            return res.status(403).json({ message: "Forbidden: You are not allow" })
        }
        next();

    }
    catch (err) {
        console.log("AUTH ERROR:", err);
        return res.status(401).json({ message: "Invalid or expired token" });
    }
}

module.exports = authenticateAdmin;