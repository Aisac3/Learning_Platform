const admindb = require("../Models/adminModel");
const { createToken } = require("../Utilities/generateToken");
const {
  hashPassword,
  comparePassword,
} = require("../Utilities/passwordUtilities");

const adminRegister = async (req, res) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const alreadyExists = await admindb.findOne({ email });
    if (alreadyExists) {
      return res.status(400).json({ error: "Email already exists" });
    }
    const hashedPassword = await hashPassword(password);
    const newAdmin = new admindb({
      email,
      password: hashedPassword,
    });
    const saved = await newAdmin.save();
    if (saved) {
      res
        .status(200)
        .json({ message: "admin registered successfullyy!!!!", saved });
    }
  } catch (error) {
    console.log(error);
    res
      .status(error.status || 500)
      .json({ error: error.message || "Internal server error" });
  }
};

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const adminExists = await admindb.findOne({ email });
    if (!adminExists) {
      return res.status(400).json({ error: "Admin doen't exists" });
    }
    const passwordMatch = await comparePassword(password, adminExists.password);
    if (!passwordMatch) {
      return res.status(400).json({ error: "Password does not match" });
    }
    const token = createToken(adminExists._id, "admin");
    //console.log(token,'token');

    res.cookie("Admin_token", token);
    return res.status(200).json({ message: "Login successfull", adminExists });
  } catch (error) {
    console.log(error);
    res
      .status(error.status || 500)
      .json({ error: error.message || "Internal server error" });
  }
};

const adminLogout = async (req, res) => {
  try {
    res.clearCookie("Admin_token");
    return res.status(200).json({ message: "logout successfull" });
  } catch (error) {
    console.log(error);
    res
      .status(error.status || 500)
      .json({ error: error.message || "Internal server error" });
  }
};
module.exports = {
  adminRegister,
  adminLogin,
  adminLogout,
};
