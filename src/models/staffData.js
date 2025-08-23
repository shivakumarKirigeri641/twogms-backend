const mongoose = require("mongoose");
const staffDataSchema = mongoose.Schema(
  {
    fkGarageDataId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "garageData",
    },
    staffName: {
      type: String,
      required: true,
      minLength: 2,
      maxLength: 150,
    },
    staffMobileNumber: {
      type: String,
      required: true,
      minLength: 10,
      maxLength: 10,
    },
    isGarageOwner: {
      type: Boolean,
      required: true,
      default: false,
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
  },
  {
    timtimestamps: true,
  }
);
const staffData = mongoose.model("staffData", staffDataSchema);
module.exports = staffData;
