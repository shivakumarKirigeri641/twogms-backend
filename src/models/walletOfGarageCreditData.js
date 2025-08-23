const mongoose = require("mongoose");
const walletOfGarageCreditDataSchema = mongoose.Schema(
  {
    fkWalletOfGarageData: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "walletOfGarageData",
    },
    creditHistory: {
      type: [
        {
          creditAmount: {
            type: Number,
            default: 0,
          },
          creditType: {
            type: String,
            default: 0,
            minLength: 0,
            maxLength: 3,
          },
          comments: {
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
const walletOfGarageCreditData = mongoose.model(
  "walletOfGarageCreditData",
  walletOfGarageCreditDataSchema
);
module.exports = walletOfGarageCreditData;
