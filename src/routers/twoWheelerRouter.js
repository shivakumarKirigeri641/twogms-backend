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
          vehicleNumber: req.params.vehiclenumber.toUpperCase(),
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

//repeat-vehicle service
twoWheelerRouter.get(
  "/twogms/edit-serviced-vehicle/:vehiclenumber",
  checkAuthentication,
  async (req, res) => {
    try {
      const result = await vehicleData
        .findOne({
          vehicleNumber: req.params.vehiclenumber.toUpperCase(),
        })
        .populate("fkCustomerDataId fkTwoWheelerDataId");
      if (!result) {
        throw new Error(
          `Vehicle number:${req.params.vehiclenumber} not found!`
        );
      }
      const serviceinfo = await serviceData
        .find({
          $and: [
            {
              fkGarageDataId: req?.loginCredentials?.fkGarageDataId,
              fkVehicleDataId: result?._id,
              serviceStatus: false,
            },
          ],
        })
        .populate({
          path: "fkVehicleDataId",
          populate: {
            path: "fkTwoWheelerDataId",
          },
        })
        .populate({
          path: "fkVehicleDataId",
          populate: {
            path: "vehicleNumber",
          },
        })
        .populate({
          path: "fkVehicleDataId",
          populate: {
            path: "fkCustomerDataId",
          },
        })
        .populate({
          path: "fkGarageDataId",
        })
        .populate({
          path: "fkAfterServiceComplaintsDataId",
        })
        .populate({
          path: "fkCustomerComplaintsDataId",
        })
        .populate({
          path: "fkAssignedStaffsDataId",
          populate: "staffs.fkStaffDataId",
        })
        .populate({
          path: "fkMechanicObservationsDataId",
        })
        .populate({
          path: "fkPartsAndAccessoriesDataId",
        })
        .populate({
          path: "fkServiceDeliveryDataId",
        })
        .populate({
          path: "fkServiceFeedbackDataId",
        })
        .populate({
          path: "fkNextServiceDataId",
        })
        .populate({
          path: "fkBillingDataId",
          populate:
            "labourServiceChargesData.fkLabourServiceChargesData washingServiceChargesData.fkWashingServiceChargesData pickupServiceChargesData.fkPickupServiceChargesData dropServiceChargesData.fkDropServiceChargesData partsAndAccessoriesData.fkPartsAndAccessoriesDataId",
        })
        .sort({ serviceSequenceNumber: -1 });
      if (0 === serviceinfo.length) {
        throw new Error("No information found!");
      }
      res.status(200).json({ status: "Ok", data: { result, serviceinfo } });
    } catch (err) {
      res.status(401).json({ status: "Failed", message: err.message });
    }
  }
);
module.exports = twoWheelerRouter;
