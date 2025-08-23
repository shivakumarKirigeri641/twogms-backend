const mongoose = require("mongoose");
const masterWalletDataSchema = mongoose.Schema(
  {
    walletDeductionPriceForAll: {
      type: Number,
      default: 100,
      min: 0,
      max: 10000,
    },
    hikesummary: {
      type: [
        {
          hikePercent: {
            type: Number,
            default: 0,
          },
          reasonForHike: {
            type: String,
            minLength: 0,
            maxLength: 300,
          },
        },
      ],
    },
  },
  {
    timtimestamps: true,
  }
);
const masterWalletData = mongoose.model(
  "masterWalletData",
  masterWalletDataSchema
);
module.exports = masterWalletData;
