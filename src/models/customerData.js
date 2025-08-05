const mongoose = require("mongoose");
const validator = require("validator");
const customerDataSchema = mongoose.Schema(
  {
    customerName: {
      type: String,
      required: true,
      unique: true,
      minLength: 2,
      maxLength: 50,
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
    password: {
      type: String,
      required: true,
      minLength: 4,
      maxLength: 100,
    },
    customerAddress: {
      type: String,
      minLength: 3,
      maxLength: 300,
    },
    customerEmail: {
      type: String,
      default: "",
      validate(value) {
        if ("" === value) return;
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email!");
        }
      },
    },
    smsNotifications: {
      type: Boolean,
      default: true,
    },
    whatsAppNotifications: {
      type: Boolean,
      default: true,
    },
    emailNotifications: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);
const customerData = mongoose.model("customerData", customerDataSchema);
module.exports = customerData;
