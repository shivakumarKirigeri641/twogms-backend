const mongoose = require("mongoose");
const billingDataSchema = mongoose.Schema(
  {
    fkServiceDataId: {
      type: new mongoose.Schema.Types.ObjectId(),
      required: true,
      ref: "serviceData",
    },
    partsAndAccessoriesData: {
      fkpartsAndAccessoriesDataId: {
        type: new mongoose.Schema.Types.ObjectId(),
        required: true,
        ref: "partsAndAccessoriesData",
      },
      isChecked: {
        type: boolean,
        default: false,
      },
    },
    standardServicesChargesData: {
      standardServicesChargesDataId: {
        type: new mongoose.Schema.Types.ObjectId(),
        required: true,
        ref: "standardServicesChargesData",
      },
      isChecked: {
        type: boolean,
        default: false,
      },
    },
    labourChargesData: {
      labourChargesDataId: {
        type: new mongoose.Schema.Types.ObjectId(),
        required: true,
        ref: "labourChargesData",
      },
      isChecked: {
        type: boolean,
        default: false,
      },
    },
    washingChargesData: {
      washingChargesDataId: {
        type: new mongoose.Schema.Types.ObjectId(),
        required: true,
        ref: "washingChargesData",
      },
      isChecked: {
        type: boolean,
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
