const express = require("express");
const checkAuthentication = require("../middleware/checkAuthentication");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const staffData = require("../models/staffData");
const serviceData = require("../models/serviceData");
const standardServiceChargesData = require("../models/standardServiceChargesData");
const labourServiceChargesData = require("../models/labourServiceChargesData");
const washingServiceChargesData = require("../models/washingServiceChargesData");
const pickupServiceChargesData = require("../models/pickupServiceChargesData");
const dropServiceChargesData = require("../models/dropServiceChargesData");
const billingData = require("../models/billingData");
const serviceChargesRouter = express.Router();

//service chrgs
serviceChargesRouter.get(
  "/twogms/service-charge-details",
  checkAuthentication,
  async (req, res) => {
    try {
      const stdServiceDetails = await standardServiceChargesData.findOne({
        fkGarageDataId: req.loginCredentials?.fkGarageDataId,
      });
      const lbrChrDetials = await labourServiceChargesData.findOne({
        fkGarageDataId: req.loginCredentials?.fkGarageDataId,
      });
      const washingdetails = await washingServiceChargesData.findOne({
        fkGarageDataId: req.loginCredentials?.fkGarageDataId,
      });
      const pickupdetails = await pickupServiceChargesData.findOne({
        fkGarageDataId: req.loginCredentials?.fkGarageDataId,
      });
      const dropdetails = await dropServiceChargesData.findOne({
        fkGarageDataId: req.loginCredentials?.fkGarageDataId,
      });
      res.status(200).json({
        status: "Ok",
        data: {
          standardServiceChargesData: stdServiceDetails,
          labourServiceChargesData: lbrChrDetials,
          washingServiceChargesData: washingdetails,
          pickupServiceChargesData: pickupdetails,
          dropServiceChargesData: dropdetails,
        },
      });
    } catch (err) {
      res.status(401).json({ status: "Failed", message: err.message });
    }
  }
);

serviceChargesRouter.get(
  "/twogms/service-charge-details/:serviceid",
  checkAuthentication,
  async (req, res) => {
    try {
      const servicedetails = await serviceData.findById(req.params.serviceid);
      if (!servicedetails) {
        throw new Error("Service information not found!");
      }
      const billingdetails = await billingData
        .findById(servicedetails.fkBillingDataId)
        .populate(
          "labourServiceChargesData.fkLabourServiceChargesData washingServiceChargesData.fkWashingServiceChargesData pickupServiceChargesData.fkPickupServiceChargesData dropServiceChargesData.fkDropServiceChargesData partsAndAccessoriesData.fkPartsAndAccessoriesDataId"
        );
      res.status(200).json({
        status: "Ok",
        data: billingdetails,
      });
    } catch (err) {
      res.status(401).json({ status: "Failed", message: err.message });
    }
  }
);
module.exports = serviceChargesRouter;
