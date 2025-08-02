const mongoose = require("mongoose");
const serviceDeliveryDataSchema = mongoose.Schema(
  {
    fkServiceDataId: {
      type: new mongoose.Schema.Types.ObjectId(),
      required: true,
      ref: "serviceData",
    },
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
  servicedeliveryDataSchema
);
module.exports = serviceDeliveryData;
