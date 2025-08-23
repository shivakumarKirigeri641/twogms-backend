const mongoose = require("mongoose");
const validator = require("validator");
const customerDataSchema = mongoose.Schema(
  {
    customerName: {
      type: String,
      required: true,
      minLength: 2,
      maxLength: 150,
    },
    customerMobileNumber: {
      type: String,
      required: true,
      minLength: 10,
      maxLength: 10,
    },
    customerAltMobileNumber: {
      type: String,
      minLength: 10,
      maxLength: 10,
    },
  },
  {
    timtimestamps: true,
  }
);
const customerData = mongoose.model("customerData", customerDataSchema);
module.exports = customerData;
