const mongoose = require("mongoose");
const garageDataSchema = mongoose.Schema({
  garageName: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 150,
  },
  garageOwnerName: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 150,
  },
  garageOwnerMobileNumber: {
    type: String,
    required: true,
    minLength: 10,
    maxLength: 10,
  },
  loginLogoutHistory: {
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
});
const garageData = mongoose.model("garageData", garageDataSchema);
module.exports = garageData;
