const express = require("express");
const serviceData = require("../models/serviceData");
const serviceRouter = express.Router();

serviceRouter.get("/getservicedvehicles", async (req, res) => {
  const garageid = "688e537a254c37b0e3d3283c";
  const result = await serviceData.find({
    $and: [
      { fkgarageId: garageid },
      { fkvehicleDataId: "688e6047cd7c61f602d1d28e" },
    ],
  });
  res.json({ status: "Ok", data: result });
});
module.exports = serviceRouter;
