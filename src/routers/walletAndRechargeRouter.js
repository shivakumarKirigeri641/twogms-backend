const express = require("express");
const checkAuthentication = require("../middleware/checkAuthentication");
require("dotenv").config();
const staffData = require("../models/staffData");
const walletOfGarageData = require("../models/walletOfGarageData");
const walletOfGarageDeductData = require("../models/walletOfGarageDeductData");
const walletOfGarageCreditData = require("../models/walletOfGarageCreditData");
const walletAndRechargeRouter = express.Router();

//getwallet balance
walletAndRechargeRouter.get(
  "/twogms/wallet-balance",
  checkAuthentication,
  async (req, res) => {
    try {
      const result = await walletOfGarageData
        .findOne({
          fkGarageDataId: req.loginCredentials?.fkGarageDataId,
        })
        .populate("fkGarageDataId");
      const result_deductionlist = await walletOfGarageDeductData.findOne({
        fkWalletOfGarageData: result._id,
      });
      const result_creditlist = await walletOfGarageCreditData.findOne({
        fkWalletOfGarageData: result._id,
      });
      res.status(200).json({
        status: "Ok",
        data: {
          walletBalanceDetails: result,
          deductionDetails: result_deductionlist,
          creditDetails: result_creditlist,
        },
      });
    } catch (err) {
      res.status(401).json({ status: "Failed", message: err.message });
    }
  }
);

module.exports = walletAndRechargeRouter;
