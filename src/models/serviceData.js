const mongoose = require("mongoose");
const validator = require("validator");
const serviceDataSchema = mongoose.Schema(
  {
    fkgarageId: {
      type: new mongoose.Schema.Types.ObjectId(),
      required: true,
      ref: "garageData",
    },
    fkvehicleDataId: {
      type: new mongoose.Schema.Types.ObjectId(),
      required: true,
      ref: "vehicleData",
    },
    serviceSequenceNumber: {
      type: Number,
      default: 1,
      required: true,
    },
    kmDriven: {
      type: Number,
      default: 0,
      min: 0,
      max: 999999,
      required: true,
    },
    fuelAtService: {
      type: Number,
      default: 1,
      min: 1,
      max: 100,
      required: true,
    },
    vehicleEntryDate: {
      type: Date,
      default: new Date(Date.now()),
    },
    fkcustomerComplaintsDataId: {
      type: new mongoose.Schema.Types.ObjectId(),
      ref: "customerComplaintsData",
    },
    fkafterServiceComplaintsDataId: {
      type: new mongoose.Schema.Types.ObjectId(),
      ref: "afterServiceComplaintsData",
    },
    fkmechanicObservationsDataId: {
      type: new mongoose.Schema.Types.ObjectId(),
      ref: "mechanicObservationsData",
    },
    fkpartsAndAccessoriesDataId: {
      type: new mongoose.Schema.Types.ObjectId(),
      ref: "partsAndAccessoriesData",
    },
    fkbillingDataId: {
      type: new mongoose.Schema.Types.ObjectId(),
      required: true,
      ref: "billingData",
    },
    fkserviceFeedbackDataId: {
      type: new mongoose.Schema.Types.ObjectId(),
      ref: "serviceFeedbackData",
    },
    fkservicedeliveryDataId: {
      type: new mongoose.Schema.Types.ObjectId(),
      required: true,
      ref: "serviceDeliveryData",
    },
    fknextServiceDataId: {
      type: new mongoose.Schema.Types.ObjectId(),
      required: true,
      ref: "nextServiceData",
    },
  },
  {
    timestamps: true,
  }
);
const serviceData = mongoose.model("serviceData", serviceDataSchema);
module.exports = serviceData;
