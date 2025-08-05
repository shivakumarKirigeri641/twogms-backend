const mongoose = require("mongoose");
const walletOfCreditDataSchema = mongoose.Schema(
  {
    fkWalletOfGarageDataId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "walletOfGarageData",
    },
    transactions: {
      type: [
        {
          amount: {
            type: Number,
            required: true,
            min: 100,
            max: 50000,
            default: 100,
          },
          creditType: {
            type: Number,
            required: true,
            min: 0,
            max: 2,
            default: 0,
          },
          fkCouponDetails: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "walletOfCouponData",
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
          referenceNumber: {
            type: String,
            required: true,
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
const walletOfCreditData = mongoose.model(
  "walletOfCreditData",
  walletOfCreditDataSchema
);
module.exports = walletOfCreditData;
