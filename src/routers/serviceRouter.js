const express = require("express");
const serviceData = require("../models/serviceData");
const serviceRouter = express.Router();
const customerComplaintsData = require("../models/customerComplaintsData");
const afterServiceComplaintsData = require("../models/afterServiceComplaintsData");
const checkAuthentication = require("./middleware/checkAuthentication");
serviceRouter.get(
  "/getservicedvehicles",
  checkAuthentication,
  async (req, res) => {
    try {
      const result = await serviceData
        .find({
          $and: [
            { fkgarageId: req.credentialsData._id },
            { isLatestService: false },
          ],
        })
        .populate({
          path: "fkcustomerComplaintsDataId",
        })
        .populate({
          path: "fkafterServiceComplaintsDataId",
        });
      res.json({ status: "Ok", data: result });
    } catch (err) {
      res.status(401).json({ status: "Failed", message: err.message });
    }
  }
);
module.exports = serviceRouter;
