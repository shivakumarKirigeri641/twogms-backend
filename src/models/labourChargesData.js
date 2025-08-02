const mongoose = require("mongoose");
const { type } = require("os");
const validator = require("validator");
const { boolean } = require("webidl-conversions");
const labourChargesDataSchema = mongoose.Schema(
  {
    fkgarageId: {
      type: new mongoose.Schema.Types.ObjectId(),
      required: true,
      ref: "garageData",
    },
    title: {
      type: String,
      default: "",
      minLength: 2,
      maxLength: 50,
    },
    description: {
      type: String,
      default: "",
      minLength: 2,
      maxLength: 300,
    },
    amountSummary: {
      type: [
        {
          amount: {
            type: Number,
            default: 0,
            minLength: 0,
            maxLength: 1000,
          },
          quantity: {
            type: Number,
            default: 1,
            minLength: 0,
            maxLength: 100,
          },
          cGST: {
            type: Number,
            default: 0,
            minLength: 0,
            maxLength: 100,
          },
          sGST: {
            type: Number,
            default: 0,
            minLength: 0,
            maxLength: 100,
          },
          comments: {
            type: String,
            default: "",
            minLength: 0,
            maxLength: 300,
          },
          dateOfAmountFixed: {
            type: Date,
            default: new Date(Date.now()),
          },
        },
      ],
    },
  },
  {
    timestamps: true,
  }
);
const labourChargesData = mongoose.model(
  "labourChargesData",
  labourChargesDataSchema
);
module.exports = labourChargesData;
