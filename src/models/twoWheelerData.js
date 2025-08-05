const mongoose = require("mongoose");
const validator = require("validator");
const { boolean } = require("webidl-conversions");
const twoWheelerDataSchema = mongoose.Schema(
  {
    variantName: {
      type: String,
      minLength: 2,
      maxLength: 100,
    },
    photoUrl: {
      type: String,
      validate(value) {
        if ("" === value) return;
        if (!validator.isURL(value)) {
          throw new Error("Invalid photo Url!");
        }
      },
    },
    logoUrl: {
      type: String,
      validate(value) {
        if ("" === value) return;
        if (!validator.isURL(value)) {
          throw new Error("Invalid logo Url!");
        }
      },
    },
    isElectric: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);
const twoWheelerData = mongoose.model("twoWheelerData", twoWheelerDataSchema);
module.exports = twoWheelerData;
