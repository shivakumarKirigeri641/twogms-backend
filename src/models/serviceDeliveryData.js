const mongoose = require("mongoose");
const validator = require("validator");
const serviceDeliveryDataSchema = mongoose.Schema(
  {
    actualDeliveryDate: {
      type: Date,
      required: true,
    },
    modifiedDeliveryDateSummary: {
      type: [
        {
          modifiedDeliveryDate: {
            type: Date,
            required: true,
          },
          reaonToPreponeOrPostpone: {
            type: String,
            required: true,
            minLength: 0,
            maxLength: 150,
          },
        },
      ],
    },
  },
  {
    timtimestamps: true,
  }
);
const serviceDeliveryData = mongoose.model(
  "serviceDeliveryData",
  serviceDeliveryDataSchema
);
module.exports = serviceDeliveryData;
