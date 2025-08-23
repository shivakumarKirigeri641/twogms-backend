const mongoose = require("mongoose");
const walletOfGarageDeductDataSchema = mongoose.Schema(
  {
    fkGarageDataId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "garageData",
    },
    deductionHistory: {
      type: [
        {
          deductAmount: {
            type: Number,
            default: 0,
          },
          deductReason: {
            type: String,
            default: "",
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
const walletOfGarageDeductData = mongoose.model(
  "walletOfGarageDeductData",
  walletOfGarageDeductDataSchema
);
module.exports = walletOfGarageDeductData;
