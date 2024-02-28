const errorThrow = require("../Middleware/ErrorHandler");
const asyncHandler = require("express-async-handler");
const LeaseModel = require("../Models/LeaseAgreement");
const PropertyBooking = require("../Models/PropertyModel");
var mongoose = require("mongoose");
const GetRentData = asyncHandler(async (req, res, next) => {
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
    res.status(200).json({ success: true, InAgreement });
  } catch (error) {
    next(error)
  }
});

module.exports={
    GetRentData
}
