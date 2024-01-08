const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const Property = require("../Models/PropertyModel");
const Review = require('../Models/ReviewModel');
const AddProperty = asyncHandler(async (req, res, next) => {
  try {
    const data = req.body;
    console.log(data);
    const imagesWithKeys = data?.ImageVideoData
    .filter(item => item.type === 'image')
    .map(item => ({ url: item.url, key: item.publicKey }));
  
  const videosWithKeys = data?.ImageVideoData
    .filter(item => item.type === 'video')
    .map(item => ({ url: item.url, key: item.publicKey }));

    // Create a new property document
    const newProperty = new Property({
      building_name: data.buildingName,
    building_number: data.buildingNumber,
    property_streetname: data.streetAddress,
    property_city: data.city,
    property_state: data.state,
    property_locality: data.locality,
    property_pincode: data.pincode,
    property_size: data.propertySize,
    property_bathrooms: data.numberOfBathrooms,
    property_year_built: data.yearBuilt,
    property_type_of_house: data.category,
    property_type: data.propertyType,
    property_no_of_bhk: data.numberOfBHKRK,
    property_furnishing: data.furnishing,
    property_parking: data.parking,
    property_description: data.description,
    property_rent_price: data.price,
    property_availability: data.status,
    property_rented: false,
    property_security_deposit: data.deposit,
    property_coordinates: {
      latitude: data.latitude,
      longitude: data.longitude,
    },
    landlord_id: data.id,
    images: imagesWithKeys,
    videos: videosWithKeys,
    preferred_tenants:data.prefferedTenant,
    });
    // Save the new property document
    const savedProperty = await newProperty.save();
    console.log(savedProperty);
    if (savedProperty) {
      res.status(200).json({ success: true });
    } else {
      console.error('Failed to save property due to validation errors:', newProperty.errors);
      errorThrow('Failed to save property due to validation errors.', 500);
    }
  } catch (error) {
    next();
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
      image: property.images[0].url, // Only include the first image value
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
