const mongoose = require("mongoose");
const walletOfDebitOnServiceDataSchema = mongoose.Schema(
  {
    fkWalletOfGarageDataId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "walletOfGarageData",
    },
    transactions: {
      type: [
        {
          fkServiceDataId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "serviceData",
          },
          amount: {
            type: Number,
            required: true,
            min: 0,
            max: 50000,
            default: 100,
          },
          debitType: {
            type: Number,
            required: true,
            min: 0,
            max: 2,
            default: 0,
          },
          previouswalletBalance: {
            type: Number,
            required: true,
            min: 0,
            max: 100000,
          },
          updatedwalletBalance: {
            type: Number,
            required: true,
            min: 0,
            max: 100000,
          },
          dateAndTimeOfCredit: {
            type: Number,
            required: true,
            default: new Date(Date.now()),
          },
          comments: {
            type: String,
            minLength: 1,
            maxLength: 100,
          },
        },
      ],
    },
  },
  {
    timestamps: true,
  }
);
const walletOfDebitOnServiceData = mongoose.model(
  "walletOfDebitOnServiceData",
  walletOfDebitOnServiceDataSchema
);
module.exports = walletOfDebitOnServiceData;
