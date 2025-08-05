const express = require("express");
const argon2 = require("argon2");
const createJWTToken = require("../utils/createJWTToken");
const authRouter = express.Router();
const garageData = require("../models/garageData");
//register garage (do it later as it includes garage entry, stdservice entry, wash, lbr details)
//to register, garage owner needs to provide
//1. std service price, list of services. (either individual prcies or all in one std service price) (any photo)
//2. labour charges
//3. washing charges
//4. air-blow charges (if applicable)
//5. pickup-drop charges (if applicable)
//6. no. of staffs & their name & phone numbers
//7. We provide with owner login credentials & staff credentials

//login
authRouter.post("/twogms/login", async (req, res) => {
  let garagedetails = null;
  try {
    res.status(200).json({ status: "Ok", data: garagedetails });
  } catch (err) {
    res.json({ status: "Failed", message: err.message });
  }
});
//logout
authRouter.post("/twogms/logout", checkAuthentication, async (req, res) => {
  try {
    res.status(200).json({ status: "Ok", message: "Logout successful" });
  } catch (err) {
    res.json({ status: "Failed", message: err.message });
  }
});
//register
authRouter.post("/twogms/gargeregistration", async (req, res) => {
  try {
    res.status(200).json({
      status: "Ok",
      message: "Garage registration successful",
      data: null,
    });
  } catch (err) {
    res.json({ status: "Failed", message: err.message });
  }
});
module.exports = authRouter;
