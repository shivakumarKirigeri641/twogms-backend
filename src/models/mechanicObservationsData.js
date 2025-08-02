const mongoose = require("mongoose");
const { type } = require("os");
const validator = require("validator");
const { boolean } = require("webidl-conversions");
const mechanicObservationsDataSchema = mongoose.Schema(
  {
    fkServiceDataId: {
      type: new mongoose.Schema.Types.ObjectId(),
      required: true,
      ref: "serviceData",
    },
    list: {
      type: [
        {
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
          amount: {
            type: Number,
            default: 0,
            minLength: 0,
            maxLength: 1000,
          },
          isChecked: {
            type: Boolean,
            default: false,
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
        },
      ],
    },
  },
  {
    timestamps: true,
  }
);
const mechanicObservationsData = mongoose.model(
  "mechanicObservationsData",
  mechanicObservationsDataSchema
);
module.exports = mechanicObservationsData;
