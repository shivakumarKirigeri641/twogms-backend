const express = require("express");
const authRouter = express.Router();
authRouter.post("/twogms/login", async (req, res) => {
  res.send("test");
});
module.exports = authRouter;
