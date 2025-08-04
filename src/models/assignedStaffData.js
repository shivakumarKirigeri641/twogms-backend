const mongoose = require("mongoose");
const assignedStaffDataSchema = mongoose.Schema({
  staffs: {
    type: [
      {
        fkstaffDataId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "staffData",
        },
        serviceAssignmentDateTime: {
          type: Date,
          default: new Date(Date.now()),
        },
      },
    ],
    required: true,
  },
});
const assignedStaffData = mongoose.model(
  "assignedStaffData",
  assignedStaffDataSchema
);
module.exports = assignedStaffData;
