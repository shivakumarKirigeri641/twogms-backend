const jwt = require("jsonwebtoken");
require("dotenv").config();
const getJWTToken = async (result) => {
  const token = await jwt.sign({ _id: result._id }, process.env.SECRET_KEY);
  return token;
};
module.exports = getJWTToken;
