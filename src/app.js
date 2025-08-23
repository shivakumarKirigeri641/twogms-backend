const express = require("express");
const app = new express();
const connectDB = require("./database/connectDB");
const authRouter = require("./routers/authRouter");
const dummyRouter = require("./routers/dummyRouter");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const serviceRouter = require("./routers/serviceRouter");
const twoWheelerRouter = require("./routers/twoWheelerRouter");
const staffRouter = require("./routers/staffRouter");
const serviceChargesRouter = require("./routers/serviceChargesRouter");
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://192.168.10.34:1234",
    credentials: true,
  })
);
app.use("/", authRouter);
app.use("/", serviceRouter);
app.use("/", dummyRouter);
app.use("/", twoWheelerRouter);
app.use("/", staffRouter);
app.use("/", serviceChargesRouter);
connectDB()
  .then(() => {
    console.log("Database connected successfully.");
    app.listen(7777, "0.0.0.0", () => {
      console.log("Server is listening now...");
    });
  })
  .catch((err) => {
    console.log("Error in connecting database.");
  });
