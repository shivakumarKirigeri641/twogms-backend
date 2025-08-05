const express = require("express");
const argon2 = require("argon2");
const createJWTToken = require("../utils/createJWTToken");
const authRouter = express.Router();
const garageData = require("../models/garageData");
//register garage (do it later as it includes garage entry, stdservice entry, wash, lbr details)

//login
authRouter.post("/twogms/login", async (req, res) => {
  let garagedetails = null;
  try {
    const { phoneNumber, password } = req.body;
    if (phoneNumber && password) {
      garagedetails = await garageData.findOne({
        garageOwnerMobileNumber: phoneNumber,
      });
      if (!garagedetails) {
        throw new Error("Invalid credentials!");
      }
      const ispwdcorrect = await argon2.verify(
        garagedetails.password,
        password
      );

      if (!ispwdcorrect) {
        throw new Error("Invalid credentials!");
      }
      req.credentialsData = garagedetails;
      const token = await createJWTToken(req);
      res.cookie("token", token);
    } else {
      throw new Error("Invalid credentials!");
    }
    res.status(200).json({ status: "Ok", data: garagedetails });
  } catch (err) {
    res.json({ status: "Failed", message: err.message });
  }
});
//logout
module.exports = authRouter;
