require("dotenv").config();
const jwt = require("jsonwebtoken");
const createJWTToken = async (req) => {
  return await jwt.sign(
    { _id: req.credentialsData._id },
    process.env.SECRET_KEY,
    { expiresIn: "1d" }
  );
};
module.exports = createJWTToken;
