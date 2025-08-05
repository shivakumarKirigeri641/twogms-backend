const express = require("express");
const serviceData = require("../models/serviceData");
const serviceRouter = express.Router();
const customerComplaintsData = require("../models/customerComplaintsData");
const afterServiceComplaintsData = require("../models/afterServiceComplaintsData");
const checkAuthentication = require("./middleware/checkAuthentication");
const { populate } = require("dotenv");
serviceRouter.get(
  "/getservicedvehicles",
  checkAuthentication,
  async (req, res) => {
    try {
      const result = await serviceData
        .find({
          $and: [
            { fkGarageId: req.credentialsData._id },
            { isLatestService: false },
          ],
        })
        .select("fkGarageId")
        .populate({
          path: "fkcustomerComplaintsDataId",
        })
        .populate({
          path: "fkafterServiceComplaintsDataId",
        })
        .populate({
          path: "fkassignedStaffDataId",
          populate: "staffs.fkStaffDataId",
        });
      //
      res.json({ status: "Ok", data: result });
    } catch (err) {
      res.status(401).json({ status: "Failed", message: err.message });
    }
  }
);
module.exports = serviceRouter;
