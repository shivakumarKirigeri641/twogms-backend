const mongoose = require("mongoose");
const standardServiceChargesDataSchema = mongoose.Schema(
  {
    fkGarageDataId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "garageData",
    },
    //only title shown, no deep details shown (if such garage owner proposes?)
    isBaseLineService: {
      type: Boolean,
      required: true,
    },
    title: {
      type: String,
      required: true,
      minLength: 0,
      maxLength: 50,
    },
    list: {
      type: [
        {
          title: {
            type: String,
            default: "",
            minLength: 0,
            maxLength: 50,
          },
          isChecked: {
            type: Boolean,
            default: true,
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
          //take only latest for UI
          amountSummary: {
            type: [
              {
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
              },
            ],
          },
        },
      ],
    },
  },
  {
    timtimestamps: true,
  }
);
const standardServiceChargesData = mongoose.model(
  "standardServiceChargesData",
  standardServiceChargesDataSchema
);
module.exports = standardServiceChargesData;
