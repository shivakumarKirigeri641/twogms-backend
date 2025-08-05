const mongoose = require("mongoose");
const nextServiceDataSchema = mongoose.Schema(
  {
    kmForNextService: {
      type: Number,
      default: 0,
      min: 0,
      max: 999999,
    },
    dateForNextService: {
      type: Date,
      default: new Date(Date.now()),
    },
  },
  {
    timestamps: true,
  }
);
const nextServiceData = mongoose.model(
  "nextServiceData",
  nextServiceDataSchema
);
module.exports = nextServiceData;
