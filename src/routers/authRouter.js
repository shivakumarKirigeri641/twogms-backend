const express = require("express");
const checkAuthentication = require("../middleware/checkAuthentication");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const staffData = require("../models/staffData");
const authRouter = express.Router();

//login
authRouter.post("/twogms/login/:mobilenumber", async (req, res) => {
  //firsrt check if mobile number valid (exists in collectiN?)
  //then go for otp
  //after successful validation of OTP,
  //we need to just validate phone number from collections.
  try {
    const mobilenumber = req.params.mobilenumber;
    const result = await staffData.findOne({ staffMobileNumber: mobilenumber });
    if (!result) {
      throw new Error("Mobile number not registered or not valid!");
    }
    const token = await jwt.sign({ _id: result._id }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "none",
      expiresIn: "30s",
    });
    res.status(200).json({ status: "Ok", message: "ok", data: result });
  } catch (err) {
    res.status(401).json({ status: "Failed", message: err.message });
  }
});

//logout
authRouter.post("/twogms/logout", checkAuthentication, async (req, res) => {
  //firsrt check if mobile number valid (exists in coll
  try {
    res.cookie("token", null, { expires: new Date(Date.now()) });
    res.status(200).json({ status: "Ok", message: "Logout Successful" });
  } catch (err) {
    res.status(401).json({ status: "Failed", message: err.message });
  }
});
module.exports = authRouter;
