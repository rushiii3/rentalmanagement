const mongoose = require("mongoose");
const User = require("./UserModel");
// Define subdocument for coordinates
const coordinatesSchema = new mongoose.Schema({
  latitude: { type: String, required: true },
  longitude: { type: String, required: true },
});

// Define the property schema
const propertySchema = new mongoose.Schema(
  {
    building_name: { type: String, required: true },
    building_number: { type: String, required: true },
    property_streetname: { type: String, required: true },
    property_city: { type: String, required: true },
    property_state: { type: String, required: true },
    property_locality: { type: String, required: true },
    property_size: { type: Number, required: true }, // Size of the property in sq. ft/m
    property_bathrooms: { type: Number, required: true }, // Number of bathrooms
    property_year_built: { type: Number, required: true }, // Year the property was built
    property_type_of_house: {
      type: String,
      required: true,
      enum: ["Haveli",
      "Bungalow",
      "Villa",
      "Apartment",
      "Flat",
      "Penthouse",
      "Row House",
      "Cottage",
      "Chawl",
      "Mansion",
      "Farmhouse",
      "House"],
    },
    property_type: {
      type: String,
      required: true,
      enum: ["BHK", "RK"],
    },
    property_no_of_bhk:{
      type: Number,
      required: true,
    },
    property_pincode: { type: String, required: true },
    property_furnishing: { type: String, required: true },
    property_parking: { type: String, required: true },
    property_description: { type: String, required: true },
    property_rent_price: { type: Number, required: true },
    property_availability: { type: Boolean, required: true },
    property_rented: { type: Boolean, required: true },
    property_security_deposit: { type: Number, required: true },
    property_coordinates: { type: coordinatesSchema, required: true },
    landlord_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: true,
    },
    images: { type: [String], required: true },
    videos: { type: [String], required: true },
    preferred_tenants: {
      type: [String],
      required: true,
      enum: ["Family", "Working professionals", "Any"],
    },
  },
  {
    timestamps: true, // Add timestamps for createdAt and updatedAt
  }
);

// Custom method to find properties by city
propertySchema.statics.findByCity = function (city) {
  return this.find({ property_city: city });
};

// Indexes for frequently queried fields
propertySchema.index({ property_city: 1, property_type: 1 });

// Pre-save middleware example
propertySchema.pre("save", function (next) {
  // Perform actions before saving, if needed
  next();
});

// Virtual property example (combining building name and number)
propertySchema.virtual("complete_address").get(function () {
  return `${this.building_number}, ${this.building_name}, ${this.property_streetname}, ${this.property_city}`;
});

const Property = mongoose.model("Property", propertySchema);

module.exports = Property;
