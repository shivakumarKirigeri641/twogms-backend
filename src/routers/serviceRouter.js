const express = require("express");
const checkAuthentication = require("../middleware/checkAuthentication");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const staffData = require("../models/staffData");
const serviceRouter = express.Router();

//servicing vehicles
serviceRouter.get(
  "/twogms/servicing-vehicles",
  checkAuthentication,
  async (req, res) => {
    try {
      res.status(200).json({ status: "Ok" });
    } catch (err) {
      res.status(401).json({ status: "Failed", message: err.message });
    }
  }
);

//serviced vehicles
serviceRouter.get(
  "/twogms/serviced-vehicles",
  checkAuthentication,
  async (req, res) => {
    //firsrt check if mobile number valid (exists in coll
    try {
      res.status(200).json({ status: "Ok" });
    } catch (err) {
      res.status(401).json({ status: "Failed", message: err.message });
    }
  }
);
module.exports = serviceRouter;
