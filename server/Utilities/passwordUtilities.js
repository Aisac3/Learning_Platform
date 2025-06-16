const bcrypt = require("bcrypt");

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt();
  const hashedPassword = bcrypt.hash(password, salt);
  return hashedPassword;
};

const comparePassword= async(password,hashedPassword)=>{
    const matchpassord=bcrypt.compare(password,hashedPassword)
    return matchpassord
}

module.exports = {hashPassword,comparePassword};
