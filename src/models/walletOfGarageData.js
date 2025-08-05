const mongoose = require("mongoose");
const walletOfGarageDataSchema = mongoose.Schema(
  {
    fkGarageDataId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "garageData",
    },
    walletBalance: {
      type: Number,
      required: true,
      min: 100,
      max: 100000,
    },
    comments: {
      type: String,
      default: "",
      minLength: 0,
      maxLength: 300,
    },
  },
  {
    timestamps: true,
  }
);
const walletOfGarageData = mongoose.model(
  "walletOfGarageData",
  walletOfGarageDataSchema
);
module.exports = walletOfGarageData;
