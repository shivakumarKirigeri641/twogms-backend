const mongoose = require("mongoose");
const validator = require("validator");
const { boolean } = require("webidl-conversions");
const twoWheelerDataSchema = mongoose.Schema(
  {
    variantName: {
      type: String,
      required: true,
      unique: true,
      minLength: 2,
      maxLength: 50,
    },
    photoUrl: {
      type: String,
      validate(value) {
        if ("" === value) return;
        if (!validator.photoUrl(value)) {
          throw new Error("Invalid photo Url!");
        }
      },
    },
    logoUrl: {
      type: String,
      validate(value) {
        if ("" === value) return;
        if (!validator.photoUrl(value)) {
          throw new Error("Invalid logo Url!");
        }
      },
    },
    isElectric: {
      type: boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);
const twoWheelerData = mongoose.model("twoWheelerData", twoWheelerDataSchema);
module.exports = twoWheelerData;
