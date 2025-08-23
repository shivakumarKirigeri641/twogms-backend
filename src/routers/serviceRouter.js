const express = require("express");
const serviceData = require("../models/serviceData");
const checkAuthentication = require("../middleware/checkAuthentication");
const { populate } = require("dotenv");
require("dotenv").config();
const serviceRouter = express.Router();

//servicing vehicles
serviceRouter.get(
  "/twogms/servicing-vehicles",
  checkAuthentication,
  async (req, res) => {
    try {
      const result = await serviceData
        .find({ serviceStatus: true })
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
        .select("serviceSequenceNumber kmDriven vehicleInDate")
        .sort({ vehicleInDate: -1 });
      res.status(200).json({ status: "Ok", data: result });
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
    try {
      const result = await serviceData
        .find({ serviceStatus: false })
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
        .select("serviceSequenceNumber kmDriven vehicleInDate")
        .sort({ vehicleInDate: -1 });
      res.status(200).json({ status: "Ok", data: result });
    } catch (err) {
      res.status(401).json({ status: "Failed", message: err.message });
    }
  }
);

//edit-servicing vehicle
serviceRouter.get(
  "/twogms/servicing-vehicle/:serviceid",
  checkAuthentication,
  async (req, res) => {
    try {
      const result = await serviceData
        .findById(req.params.serviceid)
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
        });
      if (!result) {
        throw new Error("Service information not found!");
      }
      res.status(200).json({ status: "Ok", data: result });
    } catch (err) {
      res.status(401).json({ status: "Failed", message: err.message });
    }
  }
);
module.exports = serviceRouter;
