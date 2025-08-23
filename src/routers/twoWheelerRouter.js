const express = require("express");
const checkAuthentication = require("../middleware/checkAuthentication");
require("dotenv").config();
const twoWheelerRouter = express.Router();
const vehicleData = require("../models/vehicleData");
const serviceData = require("../models/serviceData");

//get vehicle list
twoWheelerRouter.get(
  "/twogms/get-vehicles",
  checkAuthentication,
  async (req, res) => {
    try {
      const result = await vehicleData.find({}).populate("fkTwoWheelerDataId");
      res.status(200).json({ status: "Ok", data: result });
    } catch (err) {
      res.status(401).json({ status: "Failed", message: err.message });
    }
  }
);

//search vehicle
twoWheelerRouter.get(
  "/twogms/search-vehicle/:vehiclenumber",
  checkAuthentication,
  async (req, res) => {
    try {
      const result = await vehicleData
        .findOne({
          vehicleNumber: req.params.vehiclenumber,
        })
        .populate("fkCustomerDataId fkTwoWheelerDataId");
      if (!result) {
        throw new Error(
          `Vehicle number:${req.params.vehiclenumber} not found!`
        );
      }
      res.status(200).json({ status: "Ok", data: result });
    } catch (err) {
      res.status(401).json({ status: "Failed", message: err.message });
    }
  }
);
module.exports = twoWheelerRouter;
