const jwt = require("jsonwebtoken");
require("dotenv").config();
const SECRET_KEY = process.env.SECRET_KEY;
const maxAge = 3 * 24 * 60 * 60; //3days

const createToken = (id, role = "user") => {
  return jwt.sign({ id, role }, SECRET_KEY, {
    expiresIn: maxAge,
  });
};

module.exports={createToken}