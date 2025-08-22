const mongoose = require("mongoose");
const validator = require("validator");
const vehicleDataSchema = mongoose.Schema(
  {
    fkCustomerDataId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "customerData",
    },
    fkTwoWheelerDataId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "twoWheelerData",
    },
    vehicleNumber: {
      type: String,
      required: true, //UI side validation required.
    },
  },
  {
    timtimestamps: true,
  }
);
const vehicleData = mongoose.model("vehicleData", vehicleDataSchema);
module.exports = vehicleData;
