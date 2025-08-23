const mongoose = require("mongoose");
const validator = require("validator");
const serviceFeedbackDataSchema = mongoose.Schema(
  {
    fkServiceDataId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "serviceData",
    },
    ratings: {
      type: Number,
      min: 1,
      max: 5,
    },
    comments: {
      type: String,
      default: "",
      minLength: 0,
      maxLength: 500,
    },
  },
  {
    timtimestamps: true,
  }
);
const serviceFeedbackData = mongoose.model(
  "serviceFeedbackData",
  serviceFeedbackDataSchema
);
module.exports = serviceFeedbackData;
