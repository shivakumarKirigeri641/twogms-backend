const mongoose = require("mongoose");
const validator = require("validator");
const twoWheelerDataSchema = mongoose.Schema(
  {
    variantName: {
      type: String,
      required: true,
      minLength: 2,
      maxLength: 150,
    },
    photoUrl: {
      type: String,
      validate(value) {
        if (!value) return;
        if (!validator.isURL(value)) {
          throw new Error("Invalid Url provided!");
        }
      },
    },
    logoUrl: {
      type: String,
      validate(value) {
        if (!value) return;
        if (!validator.isURL(value)) {
          throw new Error("Invalid Url provided!");
        }
      },
    },
  },
  {
    timtimestamps: true,
  }
);
const twoWheelerData = mongoose.model("twoWheelerData", twoWheelerDataSchema);
module.exports = twoWheelerData;
