const jwt = require("jsonwebtoken");
const garageData = require("../../models/garageData");
require("dotenv").config();
const checkAuthentication = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    res
      .status(401)
      .json({ status: "Failed", message: "Session expired. Please re-login" });
  }
  const result = await jwt.verify(token, process.env.SECRET_KEY);
  if (!result) {
    res
      .status(401)
      .json({ status: "Failed", message: "Session expired. Please re-login" });
  }
  const resultcred = await garageData.findById(result._id);
  if (!resultcred) {
    res
      .status(401)
      .json({ status: "Failed", message: "Session expired. Please re-login" });
  }
  req.credentialsData = resultcred;
  next();
};
module.exports = checkAuthentication;
