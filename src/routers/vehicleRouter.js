const express = require("express");
const walletOfGarageData = require("../models/walletOfGarageData");
const walletOfCreditData = require("../models/walletOfCreditData");
const walletOfDebitOnOthersData = require("../models/walletOfDebitOnOthersData");
const walletOfDebitOnServiceData = require("../models/walletOfDebitOnServiceData");
const walletDeductionData = require("../models/walletDeductionData");
const billingData = require("../models/billingData");
const argon2 = require("argon2");
const standardServicesChargesData = require("../models/standardServicesChargesData");
const washingChargesData = require("../models/washingChargesData");
const labourChargesData = require("../models/labourChargesData");
const pickupChargesData = require("../models/pickupChargesData");
const dropChargesData = require("../models/dropChargesData");
const checkAuthentication = require("../routers/middleware/checkAuthentication");
const vehicleData = require("../models/vehicleData");
const serviceData = require("../models/serviceData");
const customerComplaintsData = require("../models/customerComplaintsData");
const partsAndAccessoriesData = require("../models/partsAndAccessoriesData");
const afterServiceComplaintsData = require("../models/afterServiceComplaintsData");
const serviceDeliveryData = require("../models/serviceDeliveryData");
const mechanicObservationsData = require("../models/mechanicObservationsData");
const twoWheelerData = require("../models/twoWheelerData");
const customerData = require("../models/customerData");
const serviceFeedbackData = require("../models/serviceFeedbackData");
const assignedStaffData = require("../models/assignedStaffData");
const staffData = require("../models/staffData");
const nextServiceData = require("../models/nextServiceData");
const getIntRandomNumber = require("../utils/dummy/getIntRandomNumber");
const vehicleRouter = express.Router();
const getBillAmount = require("../utils/dummy/getBillAmount");

//add vehicle to garage
vehicleRouter.post(
  "/twogms/add-vehicle",
  checkAuthentication,
  async (req, res) => {
    let {
      vehicleNumber,
      variantId,
      fuelPresent,
      kmDriven,
      customerName,
      customerMobileNumber,
      customerAltMobileNumber,
      email,
      address,
      customerComplaints,
      assignedStaffs,
      mechanicObservations,
      smsNotifications,
      whatsAppNotifications,
      emailNotifications,
    } = req.body;

    let customerinfo = null;
    try {
      //assuming client side validation is done
      let stdinfo = await standardServicesChargesData.findOne({
        fkGarageDataId: req.loginCredentials?.fkGarageDataId,
      });
      let washinfo = await washingChargesData.findOne({
        fkGarageDataId: req.loginCredentials?.fkGarageDataId,
      });
      let lbrinfo = await labourChargesData.findOne({
        fkGarageDataId: req.loginCredentials?.fkGarageDataId,
      });
      let pickupinfo = await pickupChargesData.findOne({
        fkGarageDataId: req.loginCredentials?.fkGarageDataId,
      });
      let dropinfo = await dropChargesData.findOne({
        fkGarageDataId: req.loginCredentials?.fkGarageDataId,
      });
      let staffinfo = await staffData.find({
        fkGarageDataId: req.loginCredentials?.fkGarageDataId,
      });
      let vehicledetails = await vehicleData.findOne({
        vehicleNumber: vehicleNumber.toUpperCase(),
      });
      if (!vehicledetails) {
        //you need to enter new details as these are new customer....
        customerinfo = new customerData({
          customerName: customerName,
          customerMobileNumber: customerMobileNumber,
          customerAltMobileNumber: customerAltMobileNumber
            ? customerAltMobileNumber
            : customerMobileNumber,
          password: await argon2.hash("1234"),
          smsNotifications: smsNotifications,
          whatsAppNotifications: whatsAppNotifications,
          email: email,
          address: address,
          emailNotifications: emailNotifications,
        });
        customerinfo = await customerinfo.save();
        vehicledetails = new vehicleData({
          fkCustomerDataId: customerinfo._id,
          fkTwoWheelerDataId: variantId,
          vehicleNumber: vehicleNumber.toUpperCase(),
        });
        vehicledetails = await vehicledetails.save();
      }

      //first enter all dependent entries
      //cust complaints
      let customerComplaints_info = new customerComplaintsData({
        list: customerComplaints,
      });
      customerComplaints_info = await customerComplaints_info.save();
      //after service complaints
      let afterServiceComplaintsData_info = new afterServiceComplaintsData({
        list: [],
      });
      afterServiceComplaintsData_info =
        await afterServiceComplaintsData_info.save();
      //mech obs
      let mechanicObservationsData_info = new mechanicObservationsData({
        list: mechanicObservations,
      });
      mechanicObservationsData_info =
        await mechanicObservationsData_info.save();
      //partsAndAccessoriesData
      let partsAndAccessoriesData_info = new partsAndAccessoriesData({
        list: [],
      });
      partsAndAccessoriesData_info = await partsAndAccessoriesData_info.save();
      console.log("partsAndAccessoriesData_info", partsAndAccessoriesData_info);
      //service del
      let serviceDeliveryData_info = new serviceDeliveryData({
        actualDateProposed: new Date(),
        modifiedDatesOfProposal: [
          {
            modifiedDateProposed: new Date(),
            reasonForPostponeOrPrepone: "",
          },
        ],
      });
      serviceDeliveryData_info = await serviceDeliveryData_info.save();
      //feedback
      let serviceFeedbackData_info = new serviceFeedbackData({
        rating: 0,
        comments: "",
      });
      serviceDeliveryData_info = await serviceFeedbackData_info.save();
      //next service
      let tempdate = new Date();
      let nextServiceData_info = new nextServiceData({
        kmForNextService: kmDriven + 2500,
        dateForNextService: tempdate.setDate(
          tempdate.getDate() + getIntRandomNumber(50, 60)
        ),
      });
      nextServiceData_info = await nextServiceData_info.save();
      //assigned staffs
      let assignedStaffData_info = new assignedStaffData({
        staffs: assignedStaffs,
      });
      assignedStaffData_info = await assignedStaffData_info.save();
      //billing
      let totalamt = getBillAmount(
        stdinfo,
        lbrinfo,
        washinfo,
        pickupinfo,
        dropinfo,
        partsAndAccessoriesData_info
      );
      let billingData_info = new billingData({
        partsAndAccessoriesData: {
          fkPartsAndAccessoriesDataId: partsAndAccessoriesData_info._id,
          isChecked: true,
        },
        standardServicesChargesData: {
          fkStandardServicesChargesDataId: stdinfo._id,
          isChecked: true,
        },
        labourChargesData: {
          fkLabourChargesDataId: lbrinfo._id,
          isChecked: true,
        },
        washingChargesData: {
          fkWashingChargesDataId: washinfo._id,
          isChecked: true,
        },
        pickupChargesData: {
          fkPickupChargesDataId: washinfo._id,
          isChecked: true,
        },
        dropChargesData: {
          fkDropChargesDataId: washinfo._id,
          isChecked: true,
        },
        billPaymentStatus: -1,
        totalOutStandingAmount: totalamt,
        paymentSummary: [
          {
            amountPaid: totalamt,
            onlinePay: totalamt,
            cashPay: 0,
            paidReferenceNumber: 0,
          },
        ],
      });
      billingData_info = await billingData_info.save();

      console.log("inside service now");
      //check if first time vehicle entry?
      let servicelist = await serviceData.find({
        fkVehicleDataId: vehicledetails._id,
      });
      let serviceinfo = null;
      if (0 === servicelist?.length) {
        //first time
        serviceinfo = new serviceData({
          fkGarageDataId: req?.loginCredentials?.fkGarageDataId?._id,
          fkVehicleDataId: vehicledetails._id,
          serviceSequenceNumber: 1,
          serviceStatus: 0,
          isLatestService: true,
          kmDriven,
          fuelAtService: fuelPresent,
          vehicleEntryDate: new Date(),
          fkcustomerComplaintsDataId: customerComplaints_info._id,
          fkafterServiceComplaintsDataId: afterServiceComplaintsData_info._id,
          fkmechanicObservationsDataId: mechanicObservationsData_info._id,
          fkbillingDataId: billingData_info._id,
          fkserviceFeedbackDataId: serviceFeedbackData_info._id,
          fkservicedeliveryDataId: serviceDeliveryData_info._id,
          fknextServiceDataId: nextServiceData_info._id,
          fkassignedStaffDataId: assignedStaffData_info._id,
        });
        serviceinfo = await serviceinfo.save();
      } else {
        //came previously
        serviceinfo = servicelist[servicelist.length - 1];
        serviceinfo.serviceSequenceNumber = servicelist.length + 1;
        serviceinfo.serviceStatus = 0;
        serviceinfo.isLatestService = true;
        serviceinfo.kmDriven = kmDriven;
        serviceinfo.fuelAtService = fuelPresent;
        serviceinfo.vehicleEntryDate = new Date();
        serviceinfo.fkcustomerComplaintsDataId = customerComplaints_info._id;
        serviceinfo.fkafterServiceComplaintsDataId =
          afterServiceComplaintsData_info._id;
        serviceinfo.fkmechanicObservationsDataId =
          mechanicObservationsData_info._id;
        serviceinfo.fkbillingDataId = billingData_info._id;
        serviceinfo.fkserviceFeedbackDataId = serviceFeedbackData_info._id;
        serviceinfo.fkservicedeliveryDataId = serviceDeliveryData_info._id;
        serviceinfo.fknextServiceDataId = nextServiceData_info._id;
        serviceinfo.fkassignedStaffDataId = assignedStaffData_info._id;
        await serviceinfo.save();
      }
      //deduct from wallet
      //now deduct garage-service from wallet.
      let walletofgrg = await walletOfGarageData.findOne({
        fkGarageDataId: req.loginCredentials?.fkGarageDataId,
      });
      let hikedata = await walletDeductionData.findOne({});
      let tempispresentdebit = await walletOfDebitOnServiceData.findOne({
        fkWalletOfGarageDataId: walletofgrg._id,
      });

      tempispresentdebit.transactions.push({
        fkServiceDataId: serviceinfo._id,
        amount:
          hikedata.baseAmount +
          (hikedata.baseAmount *
            hikedata.list[hikedata.list.length - 1]
              .percentageOfHikeInDeduction) /
            100,
        previouswalletBalance: walletofgrg.walletBalance,
        updatedwalletBalance:
          walletofgrg.walletBalance -
          hikedata.baseAmount +
          (hikedata.baseAmount *
            hikedata.list[hikedata.list.length - 1]
              .percentageOfHikeInDeduction) /
            100,
        dateAndTimeOfCredit: tempdate,
      });
      await tempispresentdebit.save();
      //not coming here - list
      //deduct from wallet
      walletofgrg.walletBalance =
        walletofgrg.walletBalance -
        hikedata.baseAmount +
        (hikedata.baseAmount *
          hikedata.list[hikedata.list.length - 1].percentageOfHikeInDeduction) /
          100;
      await walletofgrg.save();
      res.status(200).json({ status: "Ok", message: "Service started." });
    } catch (err) {
      res.status(403).json({ status: "Failed", message: err.message });
    }
  }
);

//edit vehicle which is currently servicing
vehicleRouter.post(
  "/twogms/edit-servicing-vehicle",
  checkAuthentication,
  async (req, res) => {
    res.send("test");
  }
);

//edit vehicle which is already served for post service addition of parts/after service complaints
vehicleRouter.post(
  "/twogms/edit-serviced-vehicle",
  checkAuthentication,
  async (req, res) => {
    res.send("test");
  }
);

//get vehicle list
vehicleRouter.get(
  "/twogms/get-vehicles",
  checkAuthentication,
  async (req, res) => {
    let list = await twoWheelerData
      .find({})
      .select("_id variantName logoUrl photoUrl")
      .sort({ variantName: 1 });
    res.status(200).json({ status: "Ok", data: list });
  }
);

//search by vehicleNumber
vehicleRouter.get(
  "/twogms/search-vehicle/:vehicleNumber",
  checkAuthentication,
  async (req, res) => {
    try {
      let vehicleDetails = await vehicleData
        .findOne({
          vehicleNumber: req.params.vehicleNumber.toUpperCase(),
        })
        .populate({
          path: "fkCustomerDataId",
        })
        .populate({
          path: "fkTwoWheelerDataId",
        });
      console.log(vehicleDetails);
      if (!vehicleDetails) {
        throw new Error("Vehicle not found!");
      }
      res.status(200).json({ status: "Ok", data: vehicleDetails });
    } catch (err) {
      res.status(404).json({ status: "Failed", message: err.message });
    }
  }
);

module.exports = vehicleRouter;
