const express = require("express");
const checkAuthentication = require("../middleware/checkAuthentication");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const staffData = require("../models/staffData");
const staffRouter = express.Router();

//get staff/owner profile
staffRouter.get(
  "/twogms/staff-profile",
  checkAuthentication,
  async (req, res) => {
    try {
      const result = await staffData
        .findById(req.loginCredentials._id)
        .populate("fkGarageDataId");
      res.status(200).json({ status: "Ok", data: result });
    } catch (err) {
      res.status(401).json({ status: "Failed", message: err.message });
    }
  }
);

module.exports = staffRouter;
