const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const Property = require("../Models/PropertyModel");
const AddProperty = asyncHandler(async (req, res, next) => {
  try {
    const landlordId = "65561f44d26a706edf92f1ba";

    // Create a new property document
    const newProperty = new Property(
      {
        building_name: 'Serenity Gardens',
        building_number: '15C',
        property_streetname: 'Gandhi Nagar Road',
        property_city: 'Chennai',
        property_state: 'Tamil Nadu',
        property_locality: 'Adyar',
        property_size: 2000,
        property_bathrooms: 4,
        property_year_built: 2012,
        property_type: 'House',
        property_bhk_type: '4+ BHK',
        property_furnishing: 'Fully Furnished',
        property_parking: 'Available',
        property_description: 'Spacious house in a serene and green neighborhood',
        property_rent_price: '$3500',
        property_availability: 'Available',
        property_security_deposit: '$4000',
        property_coordinates: {
          latitude: '13.0827',
          longitude: '80.2707',
        },
        landlord_id: landlordId,
        images: ['image_url_1', 'image_url_2'],
        videos: ['video_url_1', 'video_url_2'],
        preferred_tenants: ['Family', 'Working professionals'],
      },
    
    );

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

const get_properties = async (req, res) => {
  const page = parseInt(req.query.page) || 1; // Current page number
  const limit = parseInt(req.query.limit) || 10; // Number of items per page
  const skip = (page - 1) * limit; // Calculate the number of items to skip

  try {
    const properties = await Property.find(
      {},
      'property_bhk_type property_bathrooms building_name property_locality property_city property_state property_furnishing property_size property_parking property_rent_price landlord_id images property_type'
    )
      .populate({
        path: 'landlord_id',
        select: 'firstname lastname avatar.url',
      })
      .skip(skip) // Skip items
      .limit(limit); // Limit the number of items per page
      // const propertiess = await Property.find({});
      // console.log(propertiess);
      const transformedProperties = properties.map(property => (
        
        {
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
          url:property.landlord_id.avatar.url,
        },
        image: property.images[0], // Only include the first image value
        property_type:property.property_type
      }));
    
    res.json(transformedProperties);
  } catch (error) {
    next(error);
  }
};
const properties_landmark = asyncHandler(async(req,res,next) => {
  const state = req.query.state;
  const city = req.query.city;
  try {
    const property = await Property.find({
      property_state: state,
      property_city: city,
    });
    res.json(property);
  } catch (error) {
    next(error);
  }
})
module.exports = {
  AddProperty,
  get_properties,
  properties_landmark
};
