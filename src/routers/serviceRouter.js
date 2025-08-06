const express = require("express");
const serviceData = require("../models/serviceData");
const serviceRouter = express.Router();
const customerComplaintsData = require("../models/customerComplaintsData");
const afterServiceComplaintsData = require("../models/afterServiceComplaintsData");
const checkAuthentication = require("./middleware/checkAuthentication");
const { populate } = require("dotenv");

//serviced vehicles
serviceRouter.get(
  "/serviced-vehicles",
  checkAuthentication,
  async (req, res) => {
    try {
      const result = await serviceData
        .find({
          $and: [
            { fkGarageDataId: req?.loginCredentials?.fkGarageDataId?._id },
            { isLatestService: false },
          ],
        })
        .select("fkGarageDataId vehicleEntryDate kmDriven")
        .populate({
          path: "fkVehicleDataId",
          populate: {
            path: "fkCustomerDataId",
          },
        })
        .populate({
          path: "fkVehicleDataId",
          populate: {
            path: "fkTwoWheelerDataId",
          },
        });

      //
      res.json({ status: "Ok", data: result });
    } catch (err) {
      res.status(401).json({ status: "Failed", message: err.message });
    }
  }
);

//servicing vehicles
serviceRouter.get(
  "/servicing-vehicles",
  checkAuthentication,
  async (req, res) => {
    try {
      const result = await serviceData
        .find({
          $and: [
            { fkGarageDataId: req?.loginCredentials?.fkGarageDataId?._id },
            { isLatestService: true },
          ],
        })
        .select("fkGarageDataId vehicleEntryDate kmDriven")
        .populate({
          path: "fkVehicleDataId",
          populate: {
            path: "fkCustomerDataId",
          },
        })
        .populate({
          path: "fkVehicleDataId",
          populate: {
            path: "fkTwoWheelerDataId",
          },
        });

      //
      res.json({ status: "Ok", data: result });
    } catch (err) {
      res.status(401).json({ status: "Failed", message: err.message });
    }
  }
);
module.exports = serviceRouter;
