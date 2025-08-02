const mongoose = require("mongoose");
const validator = require("validator");
const serviceFeedbackDataSchema = mongoose.Schema(
  {
    fkServiceDataId: {
      type: new mongoose.Schema.Types.ObjectId(),
      required: true,
      ref: "serviceData",
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
    },
    comments: {
      type: String,
      default: "",
      minLength: 0,
      maxLength: 300,
    },
  },
  {
    timestamps: true,
  }
);
const serviceFeedbackData = mongoose.model(
  "serviceFeedbackData",
  serviceFeedbackDataSchema
);
module.exports = serviceFeedbackData;
