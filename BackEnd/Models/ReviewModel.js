const mongoose = require("mongoose");
const User = require("./UserModel");
const Property = require("./PropertyModel");
const reviewSchema = new mongoose.Schema({
  review: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // This refers to the 'User' model
    required: true
  },
  property_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Property', // This refers to the 'Property' model
    required: true
  },
  added:{
    type:Date,
    default: Date.now
  }
});

const ReviewModel = mongoose.model('Review', reviewSchema);

module.exports = ReviewModel;
