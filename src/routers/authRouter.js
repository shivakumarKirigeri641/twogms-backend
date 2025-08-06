const express = require("express");
const argon2 = require("argon2");
//const createJWTToken = require("../utils/createJWTToken");
const authRouter = express.Router();
const staffData = require("../models/staffData");
const garageData = require("../models/garageData");
const getJWTToken = require("../utils/getJWTToken");
const checkAuthentication = require("./middleware/checkAuthentication");
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
  try {
    const result = await staffData
      .findOne({ staffMobileNumber: req.body.phoneNumber })
      .populate({
        path: "fkGarageDataId",
        select: "garageName garageOwnerName garageAddress",
      });
    if (!result) {
      throw new Error("User does not exists!");
    } else {
      if (result.isGarageOwner) {
        //owner himself is logging in, now fetch details of him)
        const ispwdcorrect = await argon2.verify(
          result?.fkGarageDataId?.password,
          req.body.password
        );
        if (!ispwdcorrect) {
          throw new Error("Invalid credentails!");
        }
      } else {
        //staff login
        const ispwdcorrect = await argon2.verify(
          result?.staffPassword,
          req.body.password
        );
        if (!ispwdcorrect) {
          throw new Error("Invalid staff credentails!");
        }
      }
    }
    //generate token for this to send as response
    const token = await getJWTToken(result);
    res.cookie("token", token, { expiresIn: "30s" });
    res.json({ status: "ok", data: result });
  } catch (err) {
    res.json({ status: "Failed", message: err.message });
  }
});
authRouter.post("/twogms/logout", checkAuthentication, async (req, res) => {
  try {
    res.cookie("token", null, { expires: new Date(Date.now()) });
    res.json({ status: "ok", message: "Loggout successfully!" });
  } catch (err) {
    res.json({ status: "Failed", message: err.message });
  }
});
module.exports = authRouter;
