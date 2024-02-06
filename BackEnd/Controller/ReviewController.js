const asyncHandler = require("express-async-handler");
const ReviewModel = require('../Models/ReviewModel'); // Import your Review model
const UserModel = require('../Models/UserModel'); // Import your User model
const PropertyModel = require('../Models/UserModel'); // Import your Property model

const errorThrow = require("../Middleware/ErrorHandler");
const AddReview = asyncHandler(async(req,res,next)=>{
// Assuming you have user and property IDs available
const userId = '657368be8e7ade4dc68d7850'; // Replace with an existing user ID
const propertyId = '6581e8bcafeae0437c92cf75'; // Replace with an existing property ID

// Create a new review
const newReview = new ReviewModel({
  review: "Nice house",
  rating: 3,
  user_id: userId, // Reference to the user
  property_id: propertyId, // Reference to the property
});

// Save the review
newReview.save()
  .then(savedReview => {
    console.log('Review saved:', savedReview);
  })
  .catch(err => {
    console.error('Error saving review:', err);
  });
})

module.exports = {
    AddReview,
  };

