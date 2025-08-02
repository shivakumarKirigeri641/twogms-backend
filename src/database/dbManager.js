const mongoose = require("mongoose");
require("dotenv").config();
const connectDatabase = async () => {
  await mongoose.connect(process.env.CONNECTION_SECRETKEY);
};
module.exports = connectDatabase;
