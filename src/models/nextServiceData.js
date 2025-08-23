const mongoose = require("mongoose");
const validator = require("validator");
const nextServiceDataSchema = mongoose.Schema(
  {
    nextServiceDate: {
      type: Date,
      required: true,
    },
    nextServiceKilometer: {
      type: Number,
      required: true,
      minLength: 0,
      maxLength: 99999,
    },
  },
  {
    timtimestamps: true,
  }
);
const nextServiceData = mongoose.model(
  "nextServiceData",
  nextServiceDataSchema
);
module.exports = nextServiceData;
