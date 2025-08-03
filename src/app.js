const express = require("express");
const app = new express();
const connectDatabase = require("./database/dbManager");
const cors = require("cors");
const cookieParser = require("cookie-parser");
//const dummyRouter = require("./routers/dummyRouter");
const serviceRouter = require("./routers/serviceRouter");
const authRouter = require("./routers/authRouter");
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:1234",
    credentials: true,
  })
);
//app.use("/", dummyRouter);
app.use("/", serviceRouter);
app.use("/", authRouter);
connectDatabase()
  .then(() => {
    console.log("Database connected successfully.");
    app.listen(7777, () => {
      console.log("Server is listening now...");
    });
  })
  .catch((err) => {
    console.log("Error in connecting database.");
  });
