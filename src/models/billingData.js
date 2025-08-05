const mongoose = require("mongoose");
const billingDataSchema = mongoose.Schema(
  {
    partsAndAccessoriesData: {
      fkPartsAndAccessoriesDataId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "partsAndAccessoriesData",
      },
      isChecked: {
        type: Boolean,
        default: false,
      },
    },
    standardServicesChargesData: {
      fkStandardServicesChargesDataId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "standardServicesChargesData",
      },
      isChecked: {
        type: Boolean,
        default: false,
      },
    },
    labourChargesData: {
      fkLabourChargesDataId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "labourChargesData",
      },
      isChecked: {
        type: Boolean,
        default: false,
      },
    },
    washingChargesData: {
      fkWashingChargesDataId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "washingChargesData",
      },
      isChecked: {
        type: Boolean,
        default: false,
      },
    },
    pickupChargesData: {
      fkPickupChargesDataId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "pickupChargesData",
      },
      isChecked: {
        type: Boolean,
        default: false,
      },
    },
    dropChargesData: {
      fkDropChargesDataId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "dropChargesData",
      },
      isChecked: {
        type: Boolean,
        default: false,
      },
    },
    billPaymentStatus: {
      type: Number,
      default: 0,
      required: true,
      min: -1,
      max: 2,
    },
    totalOutStandingAmount: {
      type: Number,
      default: 0,
      required: true,
      min: 0,
      max: 50000,
    },
    paymentSummary: {
      type: [
        {
          amountPaid: {
            type: Number,
            default: 0,
            required: true,
            min: 0,
            max: 10000,
          },
          amountPaid: {
            type: Number,
            default: 0,
            required: true,
            min: 0,
            max: 10000,
          },
          onlinePay: {
            type: Number,
            default: 0,
            min: 0,
            max: 10000,
          },
          cashPay: {
            type: Number,
            default: 0,
            required: true,
            min: 0,
            max: 10000,
          },
          paidReferenceNumber: {
            type: String,
            default: "",
          },
        },
      ],
    },
  },
  {
    timestamps: true,
  }
);
const billingData = mongoose.model("billingData", billingDataSchema);
module.exports = billingData;
