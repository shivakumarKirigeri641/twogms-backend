const mongoose = require("mongoose");
const validator = require("validator");
const serviceFeedbackDataSchema = mongoose.Schema(
  {
    ratings: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
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
