const mongoose = require("mongoose");
const staffDataSchema = mongoose.Schema(
  {
    fkGarageDataId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "garageData",
    },
    staffName: {
      type: String,
      required: true,
      minLength: 2,
      maxLength: 100,
    },
    staffMobileNumber: {
      type: String,
      required: true,
      minLength: 10,
      maxLength: 10,
    },
    staffPassword: {
      type: String,
      required: true,
    },
    isGarageOwner: {
      type: Boolean,
      required: true,
      default: false,
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
const staffData = mongoose.model("staffData", staffDataSchema);
module.exports = staffData;
