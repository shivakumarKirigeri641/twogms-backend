const mongoose = require("mongoose");
const walletOfGarageDataSchema = mongoose.Schema(
  {
    fkGarageDataId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "garageData",
    },
    walletBalance: {
      type: {
        type: Number,
        default: 0,
        min: -1000,
        max: 100000,
      },
    },
  },
  {
    timtimestamps: true,
  }
);
const walletOfGarageData = mongoose.model(
  "walletOfGarageData",
  walletOfGarageDataSchema
);
module.exports = walletOfGarageData;
