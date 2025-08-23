const mongoose = require("mongoose");
const validator = require("validator");
const assignedStaffsDataSchema = mongoose.Schema(
  {
    staffs: {
      type: [
        {
          fkStaffDataId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "staffData",
          },
        },
      ],
    },
  },
  {
    timtimestamps: true,
  }
);
const assignedStaffsData = mongoose.model(
  "assignedStaffsData",
  assignedStaffsDataSchema
);
module.exports = assignedStaffsData;
