const jwt = require("jsonwebtoken");
const staffData = require("../models/staffData");
require("dotenv").config();
const checkAuthentication = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      res.status(401).json({
        status: "Failed",
        message: "Session Expired (token not found!)",
      });
      return;
    }
    const result = await jwt.verify(token, process.env.SECRET_KEY);
    if (!result) {
      res.status(401).json({
        status: "Failed",
        message: "Session Expired (Invalid token!)",
      });
      return;
    }
    const logindata = await staffData.findById(result._id);
    if (!logindata) {
      res.status(401).json({
        status: "Failed",
        message: "Session Expired (Invalid login informatino!)",
      });
      return;
    }
    req.loginCredentials = logindata;
    next();
  } catch (err) {
    res.status(401).json({ status: "Failed", message: err.message });
  }
};
module.exports = checkAuthentication;
