const jwt = require("jsonwebtoken");
const staffData = require("../../models/staffData");
require("dotenv").config();
const checkAuthentication = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      throw new Error("Session expired!");
    }
    const result = await jwt.verify(token, process.env.SECRET_KEY);
    if (!result) {
      throw new Error("Session expired!");
    }
    const credentials = await staffData.findById(result._id);
    if (!credentials) {
      throw new Error("User information not found!");
    }
    req.loginCredentials = credentials;
    next();
  } catch (err) {
    return res.json({ status: "Failed", message: err.message });
  }
};
module.exports = checkAuthentication;
