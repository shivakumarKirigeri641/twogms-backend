const mongoose = require("mongoose");
const validator = require("validator");
const serviceDataSchema = mongoose.Schema(
  {
    fkGarageDataId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "garageData",
    },
    fkVehicleDataId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "vehicleData",
    },
    serviceSequenceNumber: {
      type: Number,
      default: 1,
      required: true,
    },
    serviceStatus: {
      type: Number,
      default: 2,
      min: -1,
      max: 2,
      required: true,
    },
    isLatestService: {
      type: Boolean,
      default: false,
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
      type: mongoose.Schema.Types.ObjectId,
      ref: "customerComplaintsData",
    },
    fkafterServiceComplaintsDataId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "afterServiceComplaintsData",
    },
    fkmechanicObservationsDataId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "mechanicObservationsData",
    },
    fkPartsAndAccessoriesDataId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "partsAndAccessoriesData",
    },
    fkbillingDataId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "billingData",
    },
    fkserviceFeedbackDataId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "serviceFeedbackData",
    },
    fkservicedeliveryDataId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "serviceDeliveryData",
    },
    fknextServiceDataId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "nextServiceData",
    },
    fkassignedStaffDataId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "assignedStaffData",
    },
  },
  {
    timestamps: true,
  }
);
const serviceData = mongoose.model("serviceData", serviceDataSchema);
module.exports = serviceData;
