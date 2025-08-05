const mongoose = require("mongoose");
const walletDeductionDataSchema = mongoose.Schema(
  {
    baseAmount: {
      type: Number,
      required: true,
      min: 50,
      max: 10000,
    },
    list: {
      type: [
        {
          percentageOfHikeInDeduction: {
            type: Number,
            default: 0,
            min: 0,
            max: 1000,
          },
          reason: {
            type: String,
            default: "",
            minLength: 2,
            maxLength: 300,
          },
        },
      ],
    },
  },
  {
    timestamps: true,
  }
);
const walletDeductionData = mongoose.model(
  "walletDeductionData",
  walletDeductionDataSchema
);
module.exports = walletDeductionData;
