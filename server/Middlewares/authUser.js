const jwt = require("jsonwebtoken");
require("dotenv").config();

const authuser = (req, res, next) => {
  try {
    const { token } = req.cookies;
    console.log("Received token:", token);

    if (!token) {
      return res.status(401).json({ error: "JWT not found" });
    }

    const verifiedtoken = jwt.verify(token, process.env.SECRET_KEY);
    console.log("Verified token payload:", verifiedtoken);

    if (!verifiedtoken) {
      return res.status(401).json({ error: "user not authorized" });
    }

    console.log("Role from token:", verifiedtoken.role);

    if (verifiedtoken.role !== "user") {
      return res.status(403).json({ error: "Access denied" });
    }

    req.user = verifiedtoken.id; 
    next(); 
  } catch (error) {
    console.error("Auth error:", error);
    res.status(401).json({
      error: error.message || "User authentication failed",
    });
  }
};

module.exports = authuser;
