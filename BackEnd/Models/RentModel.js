const mongoose = require("mongoose");
const User = require("./UserModel");
const rentSchema = new mongoose.Schema({
  rent_month: {
    type: String,
    required: true,
  },
  rent_amount: {
    type: Number,
    required: true,
  },
  payment_type: {
    type: Boolean,
    required: true,
  },
  rent_status: {
    type: String,
    required: true,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Assuming it references user collection
    required: true,
  },
  property_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Property", // Assuming it references admin collection
    required: true,
  },
  addedDate: {
    type: Date,
    default: Date.now, // Set default value to the current date/time when the report is added
  },
});

module.exports = mongoose.model("Rent", rentSchema);
