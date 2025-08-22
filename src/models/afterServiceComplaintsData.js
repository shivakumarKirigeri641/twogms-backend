const mongoose = require("mongoose");
const validator = require("validator");
const afterServiceComplaintsDataSchema = mongoose.Schema(
  {
    list: {
      type: [
        {
          title: {
            type: String,
            default: "",
            minLength: 0,
            maxLength: 50,
          },
          comments: {
            type: String,
            default: "",
            minLength: 0,
            maxLength: 300,
          },
          description: {
            type: String,
            default: "",
            minLength: 0,
            maxLength: 300,
          },
          amount: {
            type: Number,
            default: 0,
            min: 0,
            max: 5000,
          },
          cGST: {
            type: Number,
            default: 0,
            min: 0,
            max: 100,
          },
          sGST: {
            type: Number,
            default: 0,
            min: 0,
            max: 100,
          },
          quantity: {
            type: Number,
            default: 0,
            min: 0,
            max: 100,
          },
        },
      ],
    },
  },
  {
    timtimestamps: true,
  }
);
const afterServiceComplaintsData = mongoose.model(
  "afterServiceComplaintsData",
  afterServiceComplaintsDataSchema
);
module.exports = afterServiceComplaintsData;
