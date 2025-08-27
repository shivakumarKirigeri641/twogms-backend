const express = require("express");
const serviceData = require("../models/serviceData");
const billingData = require("../models/billingData");
const afterServiceComplaintsData = require("../models/afterServiceComplaintsData");
const customerComplaintsData = require("../models/customerComplaintsData");
const mechanicObservationsData = require("../models/mechanicObservationsData");
const customerData = require("../models/customerData");
const partsAndAccessoriesData = require("../models/partsAndAccessoriesData");
const twoWheelerData = require("../models/twoWheelerData");
const checkAuthentication = require("../middleware/checkAuthentication");
const { populate } = require("dotenv");
const vehicleData = require("../models/vehicleData");
const serviceFeedbackData = require("../models/serviceFeedbackData");
const standardServiceChargesData = require("../models/standardServiceChargesData");
const pickupServiceChargesData = require("../models/pickupServiceChargesData");
const dropServiceChargesData = require("../models/dropServiceChargesData");
const labourServiceChargesData = require("../models/labourServiceChargesData");
const washingServiceChargesData = require("../models/washingServiceChargesData");
const serviceDeliveryData = require("../models/serviceDeliveryData");
const nextServiceData = require("../models/nextServiceData");
const assignedStaffsData = require("../models/assignedStaffsData");
const walletOfGarageData = require("../models/walletOfGarageData");
const walletOfGarageDeductData = require("../models/walletOfGarageDeductData");
const masterWalletData = require("../models/masterWalletData");
require("dotenv").config();
const serviceRouter = express.Router();

//servicing vehicles
serviceRouter.get(
  "/twogms/servicing-vehicles",
  checkAuthentication,
  async (req, res) => {
    try {
      console.log("logindata:", req.loginCredentials);
      const result = await serviceData
        .find({
          $and: [
            { serviceStatus: true },
            { fkGarageDataId: req.loginCredentials.fkGarageDataId },
          ],
        })
        .populate({
          path: "fkVehicleDataId",
          populate: {
            path: "fkTwoWheelerDataId",
          },
        })
        .populate({
          path: "fkVehicleDataId",
          populate: {
            path: "vehicleNumber",
          },
        })
        .populate({
          path: "fkVehicleDataId",
          populate: {
            path: "fkCustomerDataId",
          },
        })
        .populate({
          path: "fkGarageDataId",
        })
        .select("serviceSequenceNumber kmDriven vehicleInDate serviceStatus")
        .sort({ vehicleInDate: -1 });
      res.status(200).json({ status: "Ok", data: result });
    } catch (err) {
      res.status(401).json({ status: "Failed", message: err.message });
    }
  }
);

//serviced vehicles
serviceRouter.get(
  "/twogms/serviced-vehicles",
  checkAuthentication,
  async (req, res) => {
    try {
      const result = await serviceData
        .find({
          $and: [
            { serviceStatus: false },
            { fkGarageDataId: req.loginCredentials.fkGarageDataId },
          ],
        })
        .populate({
          path: "fkVehicleDataId",
          populate: {
            path: "fkTwoWheelerDataId",
          },
        })
        .populate({
          path: "fkVehicleDataId",
          populate: {
            path: "vehicleNumber",
          },
        })
        .populate({
          path: "fkVehicleDataId",
          populate: {
            path: "fkCustomerDataId",
          },
        })
        .populate({
          path: "fkGarageDataId",
        })
        .select("serviceSequenceNumber kmDriven vehicleInDate serviceStatus")
        .sort({ serviceSequenceNumber: -1 });
      let array = [];
      let vehiclenumbervisitedlist = [];
      result.forEach((element) => {
        if (!vehiclenumbervisitedlist.includes(element?.fkVehicleDataId)) {
          vehiclenumbervisitedlist.push(element?.fkVehicleDataId);
          array.push(element);
        }
      });
      res.status(200).json({ status: "Ok", data: array });
    } catch (err) {
      res.status(401).json({ status: "Failed", message: err.message });
    }
  }
);

//edit-servicing vehicle
serviceRouter.get(
  "/twogms/servicing-vehicle/:serviceid",
  checkAuthentication,
  async (req, res) => {
    try {
      const result = await serviceData
        .findById(req.params.serviceid)
        .populate({
          path: "fkVehicleDataId",
          populate: {
            path: "fkTwoWheelerDataId",
          },
        })
        .populate({
          path: "fkVehicleDataId",
          populate: {
            path: "vehicleNumber",
          },
        })
        .populate({
          path: "fkVehicleDataId",
          populate: {
            path: "fkCustomerDataId",
          },
        })
        .populate({
          path: "fkGarageDataId",
        })
        .populate({
          path: "fkAfterServiceComplaintsDataId",
        })
        .populate({
          path: "fkCustomerComplaintsDataId",
        })
        .populate({
          path: "fkAssignedStaffsDataId",
          populate: "staffs.fkStaffDataId",
        })
        .populate({
          path: "fkMechanicObservationsDataId",
        })
        .populate({
          path: "fkPartsAndAccessoriesDataId",
        })
        .populate({
          path: "fkServiceDeliveryDataId",
        })
        .populate({
          path: "fkServiceFeedbackDataId",
        })
        .populate({
          path: "fkNextServiceDataId",
        })
        .populate({
          path: "fkBillingDataId",
          populate:
            "labourServiceChargesData.fkLabourServiceChargesData washingServiceChargesData.fkWashingServiceChargesData pickupServiceChargesData.fkPickupServiceChargesData dropServiceChargesData.fkDropServiceChargesData partsAndAccessoriesData.fkPartsAndAccessoriesDataId",
        });
      if (!result) {
        throw new Error("Service information not found!");
      }
      res.status(200).json({ status: "Ok", data: result });
    } catch (err) {
      res.status(401).json({ status: "Failed", message: err.message });
    }
  }
);

//start-service
serviceRouter.post(
  "/twogms/add-vehicle",
  checkAuthentication,
  async (req, res) => {
    try {
      if (!req.body) {
        throw new Error("Invalid information provided.");
      }
      if (!req?.body?.fkBillingDataId) {
        throw new Error("Billing information not found!");
      }
      //first check if vehicle number exists? if no, insert into twowheeler, customer & vehicle data and get _id
      //if u get customer dtails on vehicle number, just heck if identical details provided, otherwise take the existing one.
      //insert al default details (blank entries)
      //then insert servicedata
      //deduct wallet amount.
      let vehicleDataId = null;
      let customerDataId = null;
      const vehicledetails = await vehicleData
        .findOne({
          vehicleNumber: req.body.vehicleNumber,
        })
        .populate({
          path: "fkCustomerDataId fkTwoWheelerDataId",
        });
      let masterwalletlist = await masterWalletData.find({});
      let walletofgarage_info = await walletOfGarageData.findOne({
        fkGarageDataId: req.loginCredentials.fkGarageDataId,
      });
      let walletOfGarageDeductData_info =
        await walletOfGarageDeductData.findOne({
          fkWalletOfGarageData: walletofgarage_info._id,
        });
      const stdinfo = await standardServiceChargesData.findOne({
        fkGarageDataId: req.loginCredentials.fkGarageDataId,
      });
      const washinfo = await washingServiceChargesData.findOne({
        fkGarageDataId: req.loginCredentials.fkGarageDataId,
      });
      const lbrinfo = await labourServiceChargesData.findOne({
        fkGarageDataId: req.loginCredentials.fkGarageDataId,
      });
      const pickupinfo = await pickupServiceChargesData.findOne({
        fkGarageDataId: req.loginCredentials.fkGarageDataId,
      });
      const dropinfo = await dropServiceChargesData.findOne({
        fkGarageDataId: req.loginCredentials.fkGarageDataId,
      });
      //insert vehicle & customer details first. if not create it
      if (!vehicledetails) {
        //insert
        let cust_info = new customerData({
          customerName: req.body.customerName,
          customerMobileNumber: req.body.customerMobileNumber,
          customerAltMobileNumber: req.body.customerAltMobileNumber
            ? req.body.customerAltMobileNumber
            : req.body.customerMobileNumber,
        });
        cust_info = await cust_info.save();
        let vehi_info = new vehicleData({
          vehicleNumber: req.body.vehicleNumber.toUpperCase(),
          fkCustomerDataId: cust_info._id,
          fkTwoWheelerDataId: req?.body?.variantId,
        });
        vehi_info = await vehi_info.save();
        vehicleDataId = vehi_info._id;
        customerDataId = cust_info._id;
      } else {
        vehicleDataId = vehicledetails?._id;
        customerDataId = vehicledetails?.fkCustomerDataId._id;
      }
      //now inset blank enteries
      let updatedList = [];
      //getAfterServiceComplaints
      if (
        req?.body?.afterServiceComplaints &&
        0 < req?.body?.afterServiceComplaints?.length
      ) {
        updatedList = req?.body?.afterServiceComplaints;
      }
      let afterServiceComplaintsData_info = new afterServiceComplaintsData({
        list: updatedList,
      });
      afterServiceComplaintsData_info =
        await afterServiceComplaintsData_info.save();
      //cust complaints
      updatedList = [];
      if (
        req?.body?.customerComplaints &&
        0 < req?.body?.customerComplaints?.length
      ) {
        updatedList = req.body.customerComplaints;
      }
      let customerComplaintsData_info = new customerComplaintsData({
        list: updatedList,
      });
      customerComplaintsData_info = await customerComplaintsData_info.save();

      //mech
      updatedList = [];
      if (
        req?.body?.mechanicObservations &&
        0 < req?.body?.mechanicObservations?.length
      ) {
        updatedList = req?.body?.mechanicObservations;
      }
      let mechanicObservationsData_info = new mechanicObservationsData({
        list: updatedList,
      });
      mechanicObservationsData_info =
        await mechanicObservationsData_info.save();

      //parts & acc
      updatedList = [];
      if (
        req?.body?.partsAndAccessories &&
        0 < req?.body?.partsAndAccessories?.length
      ) {
        updatedList = req?.body?.partsAndAccessories;
      }
      let partsAndAccessoriesData_info = new partsAndAccessoriesData({
        list: updatedList,
      });
      partsAndAccessoriesData_info = await partsAndAccessoriesData_info.save();

      //feeback
      let serviceFeedbackData_info = new serviceFeedbackData({
        comments: "",
      });
      serviceFeedbackData_info = await serviceFeedbackData_info.save();

      //billing data
      let labourServiceChargesData_info = {
        isChecked:
          req?.body?.fkBillingDataId?.labourServiceChargesData?.isChecked,
        fkLabourServiceChargesData: lbrinfo._id,
      };
      console.log("inside", washinfo);
      let washingServiceChargesData_info = {
        isChecked:
          req?.body?.fkBillingDataId?.washingServiceChargesData?.isChecked,
        fkWashingServiceChargesData: washinfo._id,
      };

      let pickupServiceChargesData_info = {
        isChecked:
          req?.body?.fkBillingDataId?.washingServiceChargesData?.isChecked,
        fkPickupServiceChargesData: pickupinfo._id,
      };
      let dropServiceChargesData_info = {
        isChecked:
          req?.body?.fkBillingDataId?.dropServiceChargesData?.isChecked,
        fkDropServiceChargesData: dropinfo._id,
      };
      let partsAndAccessoriesData_infoforbilling = {
        isChecked:
          req?.body?.fkBillingDataId?.partsAndAccessoriesData?.isChecked,
        fkPartsAndAccessoriesDataId: partsAndAccessoriesData_info._id,
      };
      //std
      let standardServiceChargesData_info = {
        isChecked:
          req?.body?.fkBillingDataId?.partsAndAccessoriesData?.isChecked,
        standardServicesAppliedList:
          req?.body?.fkBillingDataId?.standardServiceChargesData
            ?.standardServicesAppliedList,
      };
      let billing_info = new billingData({
        labourServiceChargesData: labourServiceChargesData_info,
        title: req?.body?.fkBillingDataId?.title,
        washingServiceChargesData: washingServiceChargesData_info,
        pickupServiceChargesData: pickupServiceChargesData_info,
        dropServiceChargesData: dropServiceChargesData_info,
        totalOutStandingAmount:
          req?.body?.fkBillingDataId?.totalOutStandingAmount,
        partsAndAccessoriesData: partsAndAccessoriesData_infoforbilling,
        amountSummary: req?.body?.fkBillingDataId?.amountSummary,
        standardServiceChargesData: standardServiceChargesData_info,
      });
      billing_info = await billing_info.save();
      //delivery
      let serviceDeliveryData_info = new serviceDeliveryData({
        actualDeliveryDate: req?.body?.deliveryDate,
        modifiedDeliveryDateSummary: [
          {
            modifiedDeliveryDate: req?.body?.deliveryDate,
            reason: "",
          },
        ],
      });
      serviceDeliveryData_info = await serviceDeliveryData_info.save();
      //next service date
      //const nxtservdateadd = getIntRandomNumber(60, 80);
      let nextServiceData_info = new nextServiceData({
        nextServiceKilometer: req?.body?.kmDriven + 2500,
        nextServiceDate: req?.body?.nextServiceDate,
      });
      nextServiceData_info = await nextServiceData_info.save();

      //assign staff
      let assignedstaff_info = new assignedStaffsData({
        staffs: req?.body?.assignedStaffs,
      });
      assignedstaff_info = await assignedstaff_info.save();
      //insert to servicedata
      const result_servdata = await serviceData.find({
        $and: [
          { fkVehicleDataId: vehicleDataId },
          { fkGarageDataId: req.loginCredentials.fkGarageDataId },
        ],
      });
      let servicedata_info = new serviceData({
        kmDriven: req?.body?.kmDriven,
        serviceSequenceNumber: result_servdata?.length + 1,
        fuelAtService: req?.body?.fuelAtService,
        vehicleInDate: req?.body?.vehicleInDate,
        serviceStatus: true,
        fkGarageDataId: req?.loginCredentials?.fkGarageDataId,
        fkVehicleDataId: vehicleDataId,
        fkAfterServiceComplaintsDataId: afterServiceComplaintsData_info._id,
        fkCustomerComplaintsDataId: customerComplaintsData_info._id,
        fkAssignedStaffsDataId: assignedstaff_info._id,
        fkMechanicObservationsDataId: mechanicObservationsData_info._id,
        fkPartsAndAccessoriesDataId: partsAndAccessoriesData_info._id,
        fkServiceDeliveryDataId: serviceDeliveryData_info._id,
        fkServiceFeedbackDataId: serviceFeedbackData_info._id,
        fkNextServiceDataId: nextServiceData_info._id,
        fkBillingDataId: billing_info._id,
      });
      servicedata_info = await servicedata_info.save();
      //deduct
      let hike = masterwalletlist[0].hikesummary.reduce(
        (acc, x) => (acc = acc + x.hikePercent)
      );
      let totalvaluetodeductfromwallet =
        masterwalletlist[0].walletDeductionPriceForAll + hike.hikePercent;
      walletOfGarageDeductData_info.deductionHistory.push({
        deductAmount: totalvaluetodeductfromwallet,
        deductReason: "Deducted for serviceId:" + servicedata_info._id,
      });
      await walletOfGarageDeductData_info.save();
      walletofgarage_info.walletBalance =
        walletofgarage_info.walletBalance - totalvaluetodeductfromwallet;
      await walletofgarage_info.save();
      res.status(200).json({ status: "Ok" });
    } catch (err) {
      res.status(401).json({ status: "Failed", message: err.message });
    }
  }
);

//save-service
serviceRouter.put(
  "/twogms/save-vehicle-service/:serviceid",
  checkAuthentication,
  async (req, res) => {
    try {
      if (!req?.params?.serviceid) {
        throw new Error("Invalid information provided.");
      }
      if (!req.body) {
        throw new Error("Invalid information provided.");
      }
      let serviceinfo = await serviceData.findById(req?.params?.serviceid);
      if (!serviceinfo) {
        throw new Error("Invalid information provided.");
      }

      //mech
      let mechanicObservationsData_info =
        await mechanicObservationsData.findById(
          serviceinfo?.fkMechanicObservationsDataId
        );
      mechanicObservationsData_info.list = req?.body?.mechanicObservations;
      await mechanicObservationsData_info.save();

      //cust cmplaints
      let customerComplaintsData_info = await customerComplaintsData.findById(
        serviceinfo?.fkCustomerComplaintsDataId
      );
      customerComplaintsData_info.list = req?.body?.customerComplaints;
      await customerComplaintsData_info.save();

      //after service
      let afterServiceComplaintsData_info =
        await afterServiceComplaintsData.findById(
          serviceinfo?.fkAfterServiceComplaintsDataId
        );
      afterServiceComplaintsData_info.list = req?.body?.afterServiceComplaints;
      await afterServiceComplaintsData_info.save();

      //parts
      let partsAndAccessoriesData_info = await partsAndAccessoriesData.findById(
        serviceinfo?.fkPartsAndAccessoriesDataId
      );
      partsAndAccessoriesData_info.list = req?.body?.partsAndAccessories;
      await partsAndAccessoriesData_info.save();

      //assignedStaffs
      let assignedStaffs_info = await assignedStaffsData.findById(
        serviceinfo?.fkAssignedStaffsDataId
      );
      assignedStaffs_info.staffs = req?.body?.assignedStaffs;
      await assignedStaffs_info.save();

      //bill
      let billing_info = await billingData.findById(
        serviceinfo?.fkBillingDataId
      );
      billing_info.title = "test";
      billing_info.pickupServiceChargesData.isChecked =
        req?.body?.fkBillingDataId?.pickupServiceChargesData?.isChecked;
      billing_info.washingServiceChargesData.isChecked =
        req?.body?.fkBillingDataId?.washingServiceChargesData?.isChecked;
      billing_info.partsAndAccessoriesData.isChecked =
        req?.body?.fkBillingDataId?.partsAndAccessoriesData?.isChecked;
      billing_info.partsAndAccessoriesData.isChecked =
        req?.body?.fkBillingDataId?.partsAndAccessoriesData?.isChecked;
      billing_info.standardServiceChargesData.isChecked =
        req?.body?.fkBillingDataId?.standardServiceChargesData?.isChecked;
      billing_info.standardServiceChargesData.standardServicesAppliedList =
        req?.body?.fkBillingDataId?.standardServiceChargesData?.standardServicesAppliedList;

      billing_info.totalOutStandingAmount =
        req?.body?.fkBillingDataId?.totalOutStandingAmount;

      await billing_info.save();

      serviceinfo.kmDriven = req?.body?.kmDriven;
      serviceinfo.fuelAtService = req?.body?.fuelAtService;
      await serviceinfo.save();
      res.status(200).json({ status: "Ok" });
    } catch (err) {
      res.status(401).json({ status: "Failed", message: err.message });
    }
  }
);
module.exports = serviceRouter;
