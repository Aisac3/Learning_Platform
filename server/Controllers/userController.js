const userDb = require("../Models/userModel");
const { createToken } = require("../Utilities/generateToken");
const {hashPassword,comparePassword} = require("../Utilities/passwordUtilities");


const register = async (req, res) => {
  try {
    const { name, email, phone, password, confirmpassword } = req.body || {};
    if (!name || !email || !phone || !password || !confirmpassword) {
      return res.status(400).json({ error: "All fileds are required!!!" });
    }
    if (password !== confirmpassword) {
      return res.status(400).json({ error: "Passwords doesn't match!!!" });
    }

    const userExists = await userDb.findOne({ email });
    if (userExists) {
      return res.status(400).json({ error: "User already Exists!!!" });
    }

    const hashedPassword = await hashPassword(password);
    const newUser = userDb({
      name,
      email,
      phone,
      password: hashedPassword,
    });

    const saved = await newUser.save();

    if (saved) {
        const token=createToken(saved._id)
        //console.log(token,'token');
        res.cookie('token',token)
      return res.status(200).json({ message: "User Registered!!! " });
    }
  } catch (error) {
    console.log(error);
    res
      .status(error.status || 500)
      .json({ error: error.message || "Internal server error" });
  }
};

const login=async(req,res)=>{
    try {
        const{email,password}=req.body
        if(!email ||!password){
            return res.status(400).json({error:"All fields are required"})
        }
        const userExists=await userDb.findOne({email})
        if(!userExists){
            return res.status(400).json({error:"User doen't exists"})
        }
        const passwordMatch=await comparePassword(password,userExists.password)
        if(!passwordMatch){
            return res.status(400).json({error:"Password does not match"})
        }
        const token=createToken(userExists._id)
        //console.log(token,'token');
        res.cookie('token',token)
        return res.status(200).json({message:"Login successfull",userExists})
    } catch (error) {
        console.log(error);
        res
          .status(error.status || 500)
          .json({ error: error.message || "Internal server error" });        
    }
}

const logout=async(req,res)=>{
    try {
        res.clearCookie("token")
        return res.status(200).json({message:"logout successfull"})
    } catch (error) {
        console.log(error);
        res
          .status(error.status || 500)
          .json({ error: error.message || "Internal server error" }); 
    }
}


module.exports = {
  register,
  login,
  logout
 
};
