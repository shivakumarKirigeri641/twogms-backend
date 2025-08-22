const express = require("express");
const app = new express();
const connectDatabase = require("./database/dbManager");
const cors = require("cors");
const cookieParser = require("cookie-parser");
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://192.168.10.34:1234",
    credentials: true,
  })
);
connectDatabase()
  .then(() => {
    console.log("Database connected successfully.");
    app.listen(7777, "0.0.0.0", () => {
      console.log("Server is listening now...");
    });
  })
  .catch((err) => {
    console.log("Error in connecting database.");
  });
