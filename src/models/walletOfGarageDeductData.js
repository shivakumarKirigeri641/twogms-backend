const mongoose = require("mongoose");
const walletOfGarageDeductDataSchema = mongoose.Schema(
  {
    fkWalletOfGarageData: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "walletOfGarageData",
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
