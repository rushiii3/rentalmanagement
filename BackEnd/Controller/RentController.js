const errorThrow = require("../Middleware/ErrorHandler");
const asyncHandler = require("express-async-handler");
const LeaseModel = require("../Models/LeaseAgreement");
const Property = require("../Models/PropertyModel");
var mongoose = require("mongoose");
const UserModel = require("../Models/UserModel"); // Import your User model
const Credit = require("../Models/CreditTransaction");
const RentModel = require("../Models/RentModel");
/* The `GetRentData` function is an asynchronous function that handles fetching rent data for a
specific user. Here's a breakdown of what the function does: */
const GetRentData = asyncHandler(async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(id);
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
    const Rent = await RentModel.find({ user_id: id });

    res.status(200).json({ success: true, InAgreement, Rent });
  } catch (error) {
    next(error);
  }
});

/* The `add_rent` function is responsible for adding rent transactions in the system. Here's a
breakdown of what the function does: */
const add_rent = asyncHandler(async (req, res, next) => {
  try {
    const { amounts, months, user_id, property_id } = req.body;
    const user = await UserModel.findById(user_id);
    if (!user) {
      errorThrow("User email does not exist!", 400);
    }
    const minus = user.creditPoint - amounts;
    if (minus < 0) {
      errorThrow("Insufficient credit points", 400);
    }
    const udpdate_user_credits = await UserModel.findByIdAndUpdate(user._id, {
      creditPoint: minus,
    });
    if (!udpdate_user_credits) {
      errorThrow("Failed to update user credits", 500);
    }
    const { landlord_id } = await Property.findById(property_id);
    const landlord = await UserModel.findById(landlord_id);
    if (!landlord) {
      errorThrow("User email does not exist!", 400);
    }
    const sum = landlord.creditPoint + amounts;

    const update_user_credits_landlord = await UserModel.findByIdAndUpdate(
      landlord_id,
      {
        creditPoint: sum,
      }
    );

    if (!update_user_credits_landlord) {
      errorThrow("Failed to update user credits", 500);
    }
    // Save transaction
    const newCredit = new Credit({
      creditPoints: amounts,
      sender_id: user_id,
      receiver_id: landlord_id,
    });
    const saved_credit = await newCredit.save();
    if (!saved_credit) {
      errorThrow("Failed to save transaction", 404);
    }

    // Insert rents
    const data = {
      amounts: amounts,
      months: months,
      user_id: user_id,
      property_id: property_id,
    };
    const rent = data.months.map((month) => {
      return new RentModel({
        payment_type: true,
        rent_status: true,
        rent_amount: data.amounts,
        rent_month: month,
        user_id: data.user_id,
        property_id: data.property_id,
      });
    });
    const inserted_rents = await RentModel.insertMany(rent);
    if (!inserted_rents) {
      errorThrow("Failed to insert rents", 404);
    }

    res.status(200).json({ success: true });
  } catch (error) {
    // Handle errors here
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

/* The `get_rents_for_property` function is an asynchronous function that handles fetching lease and
rent data for a specific property. Here's a breakdown of what the function does: */
const get_rents_for_property = asyncHandler(async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(id);
    const lease = await LeaseModel.find({
      property_id: id,
      lease_status: "InAgreement",
    });
    const Rents = await RentModel.find({ property_id: id });
    res.status(200).json({ success: true, lease, Rents });
  } catch (error) {
    next(error);
  }
});

/* The `add_rent_landlord` function is responsible for adding rent transactions initiated by the
landlord in the system. Here's a breakdown of what the function does: */
const add_rent_landlord = asyncHandler(async (req, res, next) => {
  try {
    const { amounts, months, user_id, property_id } = req.body;
    const data = {
      amounts: amounts,
      months: months,
      user_id: user_id,
      property_id: property_id,
    };
    const rent = data.months.map((month) => {
      return new RentModel({
        payment_type: false,
        rent_status: true,
        rent_amount: data.amounts,
        rent_month: month,
        user_id: data.user_id,
        property_id: data.property_id,
      });
    });
    const inserted_rents = await RentModel.insertMany(rent);
    if (!inserted_rents) {
      errorThrow("Failed to insert rents", 404);
    }

    res.status(200).json({ success: true });
  } catch (error) {
    next(error);
  }
});
module.exports = {
  GetRentData,
  add_rent,
  get_rents_for_property,
  add_rent_landlord,
};
