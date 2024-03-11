const asyncHandler = require("express-async-handler");
const ReviewModel = require("../Models/ReviewModel"); // Import your Review model
const UserModel = require("../Models/UserModel"); // Import your User model
const PropertyModel = require("../Models/UserModel"); // Import your Property model
const errorThrow = require("../Middleware/ErrorHandler");
/* The `AddReview` function is an asynchronous handler that handles the process of adding a new review
to the database. Here is a breakdown of what it does: */
const AddReview = asyncHandler(async (req, res, next) => {
  try {
    const { property, rating, review, user_id } = req.body;
    const newReview = new ReviewModel({
      review: review,
      rating: rating,
      user_id: user_id, // Reference to the user
      property_id: property, // Reference to the property
    });
    newReview
      .save()
      .then((savedReview) => {
        res.status(201).json({ success: true });
      })
      .catch((error) => {
        errorThrow(500, error.message);
      });
  } catch (error) {
    next(error);
  }
});
/* The `get_tenants_review` function is an asynchronous handler that retrieves reviews for a specific
user (tenant) based on the user's ID. Here is a breakdown of what it does: */
const get_tenants_review = asyncHandler(async (req, res, next) => {
  try {
    const { id } = req.params;
    const ReviewsDateils = await ReviewModel.find({ user_id: id })
      .populate({
        path: "property_id",
        model: "Property",
        select:
          "_id property_no_of_bhk property_type building_name property_locality building_number property_streetname property_city property_state property_pincode images",
      })
      .sort({ added: -1 });
    const Reviews = ReviewsDateils.map((visit) => {
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
    res.status(201).json({ success: true, Reviews });
  } catch (error) {
    next(error);
  }
});
module.exports = {
  AddReview,
  get_tenants_review,
};
