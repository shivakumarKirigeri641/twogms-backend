const mongoose = require("mongoose");
const dropServiceChargesDataSchema = mongoose.Schema(
  {
    fkGarageDataId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "garageData",
    },
    title: {
      type: String,
      required: true,
      minLength: 0,
      maxLength: 50,
    },
    //take only latest for UI
    amountSummary: {
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
          isChecked: {
            type: Boolean,
            default: true,
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
const dropServiceChargesData = mongoose.model(
  "dropServiceChargesData",
  dropServiceChargesDataSchema
);
module.exports = dropServiceChargesData;
