const mongoose = require("mongoose");
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
    fkAfterServiceComplaintsDataId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "afterServiceComplaintsData",
    },
    fkCustomerComplaintsDataId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "customerComplaintsData",
    },
    serviceStatus: {
      type: Boolean,
      required: true,
      default: false,
    },
    fkAssignedStaffsDataId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "assignedStaffsData",
    },
    fkMechanicObservationsDataId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "mechanicObservationsData",
    },
    fkPartsAndAccessoriesDataId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "partsAndAccessoriesData",
    },
    fkServiceDeliveryDataId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "serviceDeliveryData",
    },
    fkServiceFeedbackDataId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "serviceFeedbackData",
    },
    fkNextServiceDataId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "nextServiceData",
    },
    fkBillingDataId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "billingData",
    },
    serviceName: {
      type: String,
      minLength: 0,
      maxLength: 150,
    },
    serviceSequenceNumber: {
      type: Number,
      required: true,
      minLength: 1,
      maxLength: 10000,
    },
    kmDriven: {
      type: Number,
      required: true,
      minLength: 1,
      maxLength: 99999,
    },
    fuelAtService: {
      type: Number,
      required: true,
      minLength: 1,
      maxLength: 100,
    },
    vehicleInDate: {
      type: Date,
      required: true,
      default: new Date(Date.now()),
    },
    isLatestService: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timtimestamps: true,
  }
);
const serviceData = mongoose.model("serviceData", serviceDataSchema);
module.exports = serviceData;
