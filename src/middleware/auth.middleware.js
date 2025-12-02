const jwt = require("jsonwebtoken");
const JWT_SECRECT = "OctalearnPro";
exports.authentication = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Owner")) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, JWT_SECRECT, (err, user) => {
      if (err) {
        return res.status(403).json({
          message: "Token is invalid",
          error: err,
        });
      }
      req.user = user;

      next();
    });
  } else {
    res.status(401).json({
      message: "Authorization header missing",
    });
  }
};
