const express = require("express");
const serviceData = require("../models/serviceData");
const serviceRouter = express.Router();
const checkAuthentication = require("./middleware/checkAuthentication");
serviceRouter.get(
  "/getservicedvehicles",
  checkAuthentication,
  async (req, res) => {
    console.log(req.credentialsData);
    const result = await serviceData.find({
      $and: [
        { fkgarageId: req.credentialsData._id },
        { fkvehicleDataId: "688e6047cd7c61f602d1d28e" },
      ],
    });
    res.json({ status: "Ok", data: result });
  }
);
module.exports = serviceRouter;
