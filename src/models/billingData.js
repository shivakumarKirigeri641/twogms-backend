const mongoose = require("mongoose");
const billingDataSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      minLength: 0,
      maxLength: 50,
    },
    standardServiceChargesData: {
      type: {
        isChecked: {
          type: Boolean,
          default: true,
        },
        standardServicesAppliedList: {
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
            },
          ],
        },
      },
    },
    labourServiceChargesData: {
      type: {
        isChecked: {
          type: Boolean,
          default: true,
        },
        fklabourServiceChargesData: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "labourServiceChargesData",
        },
      },
    },
    washingServiceChargesData: {
      type: {
        isChecked: {
          type: Boolean,
          default: false,
        },
        fkwashingServiceChargesData: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "washingServiceChargesData",
        },
      },
    },
    pickupServiceChargesData: {
      type: {
        isChecked: {
          type: Boolean,
          default: false,
        },
        fkpickupServiceChargesData: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "pickupServiceChargesData",
        },
      },
    },
    dropServiceChargesData: {
      type: {
        isChecked: {
          type: Boolean,
          default: false,
        },
        fkdropServiceChargesData: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "dropServiceChargesData",
        },
      },
    },
    totalOutStandingAmount: {
      type: Number,
      default: 0,
      min: 0,
      max: 50000,
    },
    partsAndAccessoriesData: {
      type: {
        isChecked: {
          type: Boolean,
          default: true,
        },
        fkPartsAndAccessoriesData: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "partsAndAccessoriesData",
        },
      },
    },
    amountSummary: {
      type: [
        {
          comments: {
            type: String,
            default: "",
            minLength: 0,
            maxLength: 300,
          },
          amountPaid: {
            type: Number,
            default: 0,
            min: 0,
            max: 5000,
          },
          discountApplied: {
            type: Number,
            default: 0,
            min: 0,
            max: 5000,
          },
          onlinePay: {
            type: Number,
            default: 0,
            min: 0,
            max: 5000,
          },
          cashPay: {
            type: Number,
            default: 0,
            min: 0,
            max: 5000,
          },
          payStatus: {
            type: Number,
            default: 0,
            min: 0,
            max: 3,
          },
        },
      ],
    },
  },
  {
    timtimestamps: true,
  }
);
const billingData = mongoose.model("billingData", billingDataSchema);
module.exports = billingData;
