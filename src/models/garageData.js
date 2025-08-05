const mongoose = require("mongoose");
const validator = require("validator");
const garageDataSchema = mongoose.Schema(
  {
    garageName: {
      type: String,
      required: true,
      unique: true,
      minLength: 2,
      maxLength: 50,
    },
    garageOwnerName: {
      type: String,
      required: true,
      minLength: 2,
      maxLength: 100,
    },
    garageOwnerMobileNumber: {
      type: String,
      required: true,
      minLength: 10,
      maxLength: 10,
    },
    password: {
      type: String,
      required: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Password is weak!");
        }
      },
    },
    garageAddress: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 300,
    },
    loginLogoutRecords: {
      type: [
        {
          loginDateTime: {
            type: Date,
          },
          logoutDateTime: {
            type: Date,
          },
        },
      ],
    },
  },
  {
    timestamps: true,
  }
);
const garageData = mongoose.model("garageData", garageDataSchema);
module.exports = garageData;
