const mongoose = require("mongoose");
const validator = require("validator");
const vehicleDataSchema = mongoose.Schema(
  {
    vehicleNumber: {
      type: String,
      required: true,
    },
    fkcustomerDataId: {
      type: new mongoose.Schema.Types.ObjectId(),
      required: true,
      ref: "customerData",
    },
    fktwoWheelerDataId: {
      type: new mongoose.Schema.Types.ObjectId(),
      required: true,
      ref: "twoWheelerData",
    },
  },
  {
    timestamps: true,
  }
);
const vehicleData = mongoose.model("vehicleData", vehicleDataSchema);
module.exports = vehicleData;
