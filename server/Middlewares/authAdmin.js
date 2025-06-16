const jwt = require("jsonwebtoken");
require("dotenv").config();

const authadmin = (req, res, next) => {
  try {
    const { Admin_token } = req.cookies;
    console.log("Received token:", Admin_token);

    if (!Admin_token) {
      return res.status(401).json({ error: "JWT not found" });
    }

    const verifiedtoken = jwt.verify(Admin_token, process.env.SECRET_KEY);
    console.log("Verified token payload:", verifiedtoken);

    if (!verifiedtoken) {
      return res.status(401).json({ error: "Admin not authorized" });
    }

    console.log("Role from token:", verifiedtoken.role);

    if (verifiedtoken.role !== "admin") {
      return res.status(403).json({ error: "Access denied" });
    }

    req.admin = verifiedtoken.id; // Save admin ID to request object
    next(); 
  } catch (error) {
    console.error("Auth error:", error);
    res.status(401).json({
      error: error.message || "Admin authentication failed",
    });
  }
};

module.exports = authadmin;
