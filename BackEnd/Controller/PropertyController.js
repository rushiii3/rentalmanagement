const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const Property = require("../Models/PropertyModel");
const Review = require('../Models/ReviewModel');
const AddProperty = asyncHandler(async (req, res, next) => {
  try {
    const landlordId = "65561f44d26a706edf92f1ba";

    // Create a new property document
    const newProperty = new Property({
      building_name: "Garden View",
    building_number: "A-12",
    property_streetname: "MG Road",
    property_city: "Mumbai",
    property_state: "Maharashtra",
    property_locality: "Andheri West",
    property_pincode: "400053",
    property_size: 1500,
    property_bathrooms: 2,
    property_year_built: 2010,
    property_type_of_house: "Apartment",
    property_type: "BHK",
    property_no_of_bhk: 2,
    property_furnishing: "Semi-Furnished",
    property_parking: "Available",
    property_description: "Beautiful apartment with a garden view.",
    property_rent_price: 25000,
    property_availability: true,
    property_rented: false,
    property_security_deposit: 50000,
    property_coordinates: {
      latitude: "19.1157",
      longitude: "72.8723",
    },
    landlord_id: landlordId,
    images: ["image_url_1", "image_url_2"],
    videos: ["video_url_1", "video_url_2"],
    preferred_tenants: ["Family", "Working professionals"],
    });

    // Save the new property document
    newProperty
      .save()
      .then((savedProperty) => {
        console.log("Property saved:", savedProperty);
      })
      .catch((error) => {
        console.error("Error saving property:", error);
      });
  } catch (error) {
    console.log(error.message);
  }
});

const get_properties = async (req, res, next) => {
  const page = parseInt(req.query.page) || 1; // Current page number
  const limit = parseInt(req.query.limit) || 10; // Number of items per page
  const skip = (page - 1) * limit; // Calculate the number of items to skip
  const propertyTypes = req.query.type.split(",");
  const sort = req.query.sort;
  const price = req.query.price.split(",");
  const Furnishing = req.query.Furnishing.split(",");
  const filters = {
    property_availability: true,
    property_rented: false,
  };
  const sorting = {};
  if (req.query.state) {
    filters.property_state = req.query.state;
  }
  if (req.query.city) {
    filters.property_city = req.query.city;
  }
  if (req.query.landmark) {
    filters.property_locality = req.query.landmark;
  }
  if (!propertyTypes.includes("All")) {
    filters.property_type_of_house = { $in: propertyTypes }; // Use $in operator for multiple values
  }
  if (price.length === 2) {
    filters.property_rent_price = {
      $gte: parseInt(price[0]), // Greater than or equal to the lower limit
      $lte: parseInt(price[1]), // Less than or equal to the upper limit
    };
  }
  if (req.query.bedrooms !== "any") {
    console.log(req.query.bedrooms.trim() == 4);
    if (req.query.bedrooms.trim() == 4) {
      filters.property_no_of_bhk = { $gte: 4 };
    } else {
      filters.property_no_of_bhk = parseInt(req.query.bedrooms);
    }
  }
  if (req.query.bathrooms !== "any") {
    if (req.query.bathrooms.trim() == 4) {
      filters.property_bathrooms = { $gte: 4 };
    } else {
      filters.property_bathrooms = parseInt(req.query.bathrooms);
    }
  }
  if (!Furnishing.includes("Any")) {
    filters.property_furnishing = { $in: Furnishing }; // Use $in operator for multiple values
  }
  if (sort === "Newest") {
    sorting.createdAt = 1;
  } else if (sort === "Oldest") {
    sorting.createdAt = -1;
  } else if (sort === "Price Low") {
    sorting.property_rent_price = 1;
  } else if (sort === "Price High") {
    sorting.property_rent_price = -1;
  }
  try {
    const properties = await Property.find(
      filters,
      "property_bhk_type property_bathrooms building_name property_locality property_city property_state property_furnishing property_size property_parking property_rent_price landlord_id images property_type property_no_of_bhk"
    )
      .populate({
        path: "landlord_id",
        select: "firstname lastname avatar.url",
      })
      .sort(sorting)
      .skip(skip) // Skip items
      .limit(limit); // Limit the number of items per page
    const transformedProperties = properties.map((property) => ({
      property_bhk_type: property.property_bhk_type,
      property_bathrooms: property.property_bathrooms,
      building_name: property.building_name,
      property_locality: property.property_locality,
      property_city: property.property_city,
      property_state: property.property_state,
      property_furnishing: property.property_furnishing,
      property_size: property.property_size,
      property_parking: property.property_parking,
      property_rent_price: property.property_rent_price,
      landlord: {
        firstname: property.landlord_id.firstname,
        lastname: property.landlord_id.lastname,
        url: property.landlord_id.avatar.url,
      },
      image: property.images[0], // Only include the first image value
      property_type: property.property_type,
      property_bhks: property.property_no_of_bhk,
      id : property._id,
    }));

    res.json(transformedProperties);
  } catch (error) {
    next(error);
  }
};
const properties_landmark = asyncHandler(async (req, res, next) => {
  const state = req.query.state;
  const city = req.query.city;
  try {
    const localitiesSet = new Set();
    const properties = await Property.find({
      property_state: state,
      property_city: city,
    });

    properties.forEach((property) => {
      localitiesSet.add(property.property_locality);
    });

    const uniqueLocalities = Array.from(localitiesSet).map((locality) => ({
      property_locality: locality,
    }));

    res.json(uniqueLocalities);
  } catch (error) {
    next(error);
  }
});
const getSinglePropertyDetail = asyncHandler(async (req, res, next) => {
  try {
    const { id } = req.params;
    const property = await Property.findById(id)
      .populate({
        path: 'landlord_id',
        select: 'firstname lastname avatar.url',
      })
    const review = await Review.find({ property_id: id }).
    populate({
      path: 'user_id',
      select: 'firstname lastname avatar.url',
    });
   

    if (!property) {
      errorThrow('No property available', 404);
    }

    res.status(200).json({property,review});
  } catch (error) {
    next(error);
  }
});

module.exports = {
  AddProperty,
  get_properties,
  properties_landmark,
  getSinglePropertyDetail
};
