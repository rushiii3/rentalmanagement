const errorThrow = require("../Middleware/ErrorHandler");
const asyncHandler = require("express-async-handler");
const LeaseModel = require("../Models/LeaseAgreement");
const PropertyBooking = require("../Models/PropertyModel");
const MaintenaceModel = require("../Models/MaintenanceModel");
var mongoose = require("mongoose");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

cloudinary.config({
  cloud_name: "dmuhioahv",
  api_key: "166273865775784",
  api_secret: "blcMAs-77T_1t1VGnRIlLia_RqM",
  secure: true,
});
/* The `get_lease_gata` function is an asynchronous handler that retrieves lease data based on a
property ID. Here's a breakdown of what it does: */
const get_lease_gata = asyncHandler(async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      errorThrow("Invalid Property Id", 404);
    }
    const LeaseData = await LeaseModel.find({ property_id: id }).populate({
      path: "user_id",
      model: "User",
      select: "-_id firstname lastname avatar",
    });
    res.status(200).json({ msg: true, LeaseData });
  } catch (error) {
    next(error);
  }
});
/* The `Update_lease` function is responsible for updating lease information based on the data provided
in the request body. Here's a breakdown of what it does: */
const Update_lease = asyncHandler(async (req, res, next) => {
  try {
    const data = req.body;
    const files = req.fileuplad;
    console.log("files", files.path);
    console.log("data", data);
    const result = await cloudinary.uploader
      .upload(files.path)
      .catch((error) => {
        errorThrow(error.message, 500);
      });
    console.log(result);

    fs.unlink(files.path, (err) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log("removed file");
      //file removed
    });
    const UpdatedLease = await LeaseModel.findByIdAndUpdate(data.id, {
      lease_start_date: data.startDate,
      lease_end_date: data.endDate,
      rent_amount: data.rentAmount,
      security_deposit: data.securityAmount,
      aadhar_number: data.tenantAadharCard,
      agreement_doc: result.secure_url,
      lease_status: "InAgreement",
    });
    if (!UpdatedLease) {
      errorThrow("Failed to upadte lease data", 500);
    }
    res.status(200).json({ success: true, doc: result.secure_url });
  } catch (error) {
    next(error);
  }
});
/* The `delete_terminate` function is responsible for handling the termination or deletion of a lease
agreement based on the action provided in the request body. Here's a breakdown of what it does: */
const delete_terminate = asyncHandler(async (req, res, next) => {
  try {
    const { action, action_id } = req.body;
    const { property_id } = await LeaseModel.findById(action_id);
    const update_property_rent = await PropertyBooking.findByIdAndUpdate(
      property_id,
      {
        property_rented: false,
      }
    );
    if (!update_property_rent) {
      errorThrow("Failed to update property status", 500);
    }
    if (action === "Terminate") {
      const update_lease_status = await LeaseModel.findByIdAndUpdate(
        action_id,
        { lease_status: action }
      );
      if (!update_lease_status) {
        errorThrow("Failed to terminate lease", 500);
      }
      res.status(200).json({ success: true });
    }
    if (action === "Delete") {
      const Delete_Lease = await LeaseModel.findByIdAndDelete(action_id);
      if (!Delete_Lease) {
        errorThrow("Failed to delete lease", 500);
      }
      res.status(200).json({ success: true });
    }
  } catch (error) {
    next(error);
  }
});
/* The `get_tenant_leases` function is responsible for fetching lease data for a specific tenant based
on the tenant's ID. Here's a breakdown of what it does: */
const get_tenant_leases = asyncHandler(async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(id);
    const lease = await LeaseModel.find(
      { user_id: id },
      { aadhar_number: 0 }
    ).populate({
      path: "property_id",
      model: "Property",
      select:
        "_id property_no_of_bhk property_type building_name property_locality building_number property_streetname property_city property_state property_pincode images",
      populate: {
        path: "landlord_id",
        model: "User",
        select: "-_id firstname lastname",
      },
    });
    const finallease = lease.map((leases) => {
      if (
        leases.property_id &&
        leases.property_id.images &&
        leases.property_id.images.length > 0
      ) {
        const { images, ...propertyWithoutImages } =
          leases.property_id.toObject(); // Destructure 'images' from 'property_id'
        return {
          ...leases.toObject(), // Convert Mongoose object to plain JavaScript object
          property_id: {
            ...propertyWithoutImages, // Exclude 'images' from 'property_id'
            image: leases.property_id.images[0].url, // Retain only the URL of the first image
          },
        };
      }
      return leases;
    });
    res.status(200).json({ success: true, finallease });
  } catch (error) {}
});
/* The `tenant_in_agreement` function is responsible for fetching data related to a tenant who is
currently in an agreement. Here's a breakdown of what it does: */
const tenant_in_agreement = asyncHandler(async (req, res, next) => {
  try {
    const { id } = req.params;
    const InAgreementDetails = await LeaseModel.find({
      user_id: id,
      lease_status: "InAgreement",
    })
      .populate({
        path: "property_id",
        model: "Property",
        select:
          "_id property_no_of_bhk property_type building_name property_locality building_number property_streetname property_city property_state property_pincode images",
      })
      .limit(1);
    const Maintenances = await MaintenaceModel.find({ user_id: id }).populate({
      path: "property_id",
      model: "Property",
      select:
        "_id property_no_of_bhk property_type building_name property_locality building_number property_streetname property_city property_state property_pincode images",
    });
    const InAgreement = InAgreementDetails.map((visit) => {
      if (
        visit.property_id &&
        visit.property_id.images &&
        visit.property_id.images.length > 0
      ) {
        const { images, ...propertyWithoutImages } =
          visit.property_id.toObject(); // Destructure 'images' from 'property_id'
        return {
          ...visit.toObject(), // Convert Mongoose object to plain JavaScript object
          property_id: {
            ...propertyWithoutImages, // Exclude 'images' from 'property_id'
            image: visit.property_id.images[0].url, // Retain only the URL of the first image
          },
        };
      }
      return visit;
    });
    const finalMaintenances = Maintenances.map((visit) => {
      if (
        visit.property_id &&
        visit.property_id.images &&
        visit.property_id.images.length > 0
      ) {
        const { images, ...propertyWithoutImages } =
          visit.property_id.toObject(); // Destructure 'images' from 'property_id'
        return {
          ...visit.toObject(), // Convert Mongoose object to plain JavaScript object
          property_id: {
            ...propertyWithoutImages, // Exclude 'images' from 'property_id'
            image: visit.property_id.images[0].url, // Retain only the URL of the first image
          },
        };
      }
      return visit;
    });
    res.status(200).json({ success: true, InAgreement, finalMaintenances });
  } catch (error) {
    next(error);
  }
});
/* The `get_tenant_lease` function is responsible for fetching lease data for a specific tenant based
on the tenant's ID. Here's a breakdown of what it does: */
const get_tenant_lease = asyncHandler(async (req, res, next) => {
  try {
    const { id } = req.params;
    const InAgreementDetails = await LeaseModel.find({
      user_id: id,
      $or: [{ lease_status: "InAgreement" }, { lease_status: "Ended" }],
    }).populate({
      path: "property_id",
      model: "Property",
      select:
        "_id property_no_of_bhk property_type building_name property_locality building_number property_streetname property_city property_state property_pincode images",
    });

    const AgreementDetails = InAgreementDetails.map((visit) => {
      if (
        visit.property_id &&
        visit.property_id.images &&
        visit.property_id.images.length > 0
      ) {
        const { images, ...propertyWithoutImages } =
          visit.property_id.toObject(); // Destructure 'images' from 'property_id'
        return {
          ...visit.toObject(), // Convert Mongoose object to plain JavaScript object
          property_id: {
            ...propertyWithoutImages, // Exclude 'images' from 'property_id'
            image: visit.property_id.images[0].url, // Retain only the URL of the first image
          },
        };
      }
      return visit;
    });
    res.status(200).json({ success: true, AgreementDetails });
  } catch (error) {
    next(error);
  }
});
module.exports = {
  get_lease_gata,
  Update_lease,
  delete_terminate,
  get_tenant_leases,
  tenant_in_agreement,
  get_tenant_lease,
};
