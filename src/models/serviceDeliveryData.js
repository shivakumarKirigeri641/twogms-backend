const mongoose = require("mongoose");
const serviceDeliveryDataSchema = mongoose.Schema(
  {
    actualDateProposed: {
      type: Date,
      default: new Date(Date.now()),
    },
    modifiedDatesOfProposal: {
      type: [
        {
          modifiedDateProposed: {
            type: Date,
            default: new Date(Date.now()),
          },
          reasonForPostponeOrPrepone: {
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
const serviceDeliveryData = mongoose.model(
  "serviceDeliveryData",
  serviceDeliveryDataSchema
);
module.exports = serviceDeliveryData;
