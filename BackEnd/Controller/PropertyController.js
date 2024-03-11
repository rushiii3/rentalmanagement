const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const Property = require("../Models/PropertyModel");
const Review = require("../Models/ReviewModel");
const User = require("../Models/UserModel");
const errorThrow = require("../Middleware/ErrorHandler");
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: "dmuhioahv",
  api_key: "166273865775784",
  api_secret: "blcMAs-77T_1t1VGnRIlLia_RqM",
  secure: true,
});
const AddProperty = asyncHandler(async (req, res, next) => {
  try {
    const data = req.body;
    const imagesWithKeys = data?.ImageVideoData.filter(
      (item) => item.type === "image"
    ).map((item) => ({ url: item.url, publicKey: item.publicKey }));
    const videosWithKeys = data?.ImageVideoData.filter(
      (item) => item.type === "video"
    ).map((item) => ({ url: item.url, publicKey: item.publicKey }));
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
      preferred_tenants: data.prefferedTenant,
    });
    // Save the new property document
    const savedProperty = await newProperty.save();
    console.log(savedProperty);
    if (savedProperty) {
      res.status(200).json({ success: true });
    } else {
      console.error(
        "Failed to save property due to validation errors:",
        newProperty.errors
      );
      errorThrow("Failed to save property due to validation errors.", 500);
    }
  } catch (error) {
    next(error);
  }
});

/**
 * The function `get_properties` retrieves properties based on various filters and sorting criteria,
 * transforming the data before sending it as a response.
 * @param req - req: The request object containing query parameters like page, limit, type, sort,
 * price, Furnishing, state, city, landmark, bedrooms, bathrooms.
 * @param res - The `res` parameter in the `get_properties` function is the response object that will
 * be used to send the response back to the client making the request. In this case, the response will
 * be in JSON format and will contain the transformed properties data based on the filters and sorting
 * criteria provided in the
 * @param next - In the provided code snippet, the `next` parameter in the `get_properties` function is
 * a callback function that is used to pass any errors that occur during the execution of the
 * asynchronous operation to the Express error handling middleware.
 */
/**
 * The function `get_properties` retrieves properties based on various filters and sorting criteria,
 * then transforms the data before sending it as a response.
 * @param req - req is the request object that contains information sent by the client to the server.
 * It includes data such as query parameters, body content, headers, and more. In this specific
 * function `get_properties`, the req object is used to extract query parameters like page, limit,
 * type, sort, price,
 * @param res - The `res` parameter in the `get_properties` function is the response object that will
 * be used to send the response back to the client making the request. In this case, the response will
 * be in JSON format and will contain the transformed properties based on the filters and sorting
 * criteria applied to the Property
 * @param next - In the provided code snippet, the `next` parameter is a function that is used to pass
 * control to the next middleware function in the stack. It is typically used in Express.js middleware
 * functions to pass any errors to the error-handling middleware.
 */
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
      id: property._id,
    }));

    res.json(transformedProperties);
  } catch (error) {
    next(error);
  }
};
/* The above code is a JavaScript function that handles a request to fetch properties based on the
state and city provided in the query parameters. It uses an asynchronous handler to await the result
of querying the database for properties that match the state and city criteria. */
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
/* The above code is a JavaScript function that retrieves details of a single property based on the
provided ID. It uses async/await syntax to handle asynchronous operations. */
const getSinglePropertyDetail = asyncHandler(async (req, res, next) => {
  try {
    const { id } = req.params;
    const property = await Property.findById(id).populate({
      path: "landlord_id",
      select: "firstname lastname avatar.url",
    });
    const review = await Review.find({ property_id: id }).populate({
      path: "user_id",
      select: "firstname lastname avatar.url",
    });

    if (!property) {
      errorThrow("No property available", 404);
    }

    res.status(200).json({ property, review });
  } catch (error) {
    next(error);
  }
});
/* The above code is a JavaScript function that is used to get properties belonging to a specific
landlord. It is an asynchronous function that handles the request, retrieves the landlord's ID based
on the email provided in the request parameters, and then finds properties associated with that
landlord ID in the database. If the landlord ID is not found, it throws an error with a status code
of 404. Finally, it returns a JSON response with the properties found for that landlord. */
const get_landlord_properties = asyncHandler(async (req, res, next) => {
  try {
    const { id } = req.params;
    const { _id } = await User.findOne({ email: id });
    if (!_id) {
      errorThrow("No user exists", 404);
    }
    const property = await Property.find({ landlord_id: _id });
    res.status(200).json({ property });
  } catch (error) {
    next(error);
  }
});
/* The above code is a JavaScript function that is using async/await syntax to handle asynchronous
operations. It is a function called `get_properties_info` that takes in `req`, `res`, and `next` as
parameters. Inside the function, it first extracts the `id` parameter from the request parameters.
It then checks if the `id` is a valid MongoDB ObjectId using `mongoose.Types.ObjectId.isValid(id)`.
If the `id` is not valid, it throws an error with a message "Invalid Property Id" and status code
404. */
/* The above code is a JavaScript function that is using async/await syntax to handle asynchronous
operations. It is a controller function for getting information about a property based on the
provided ID. Here is a breakdown of what the code is doing: */
const get_properties_info = asyncHandler(async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      errorThrow("Invalid Property Id", 404);
    }
    const PropertyInfo = await Property.findById(id);
    res.status(200).json({ success: true, PropertyInfo });
  } catch (error) {
    next(error);
  }
});
/* The above code is a JavaScript function that is designed to delete an image from a cloud storage
service, likely Cloudinary. Here is a breakdown of what the code is doing: */
const delete_image = asyncHandler(async (req, res, next) => {
  try {
    const { token } = req.body;
    const { result } = await cloudinary.uploader.destroy(token);
    if (result === "not found") {
      errorThrow("No image ID not found", 404);
    } else {
      res.status(200).json({ success: true });
    }
    console.log(result);
  } catch (error) {
    next(error);
  }
});
/* The above code is a JavaScript function that handles updating a property in a database. It takes in
a request object (`req`), response object (`res`), and a `next` function as parameters. */
const update_property = asyncHandler(async (req, res, next) => {
  try {
    const data = req.body;
    if (!data) {
      errorThrow("No data found to update", 404);
    }
    const imagesWithKeys = data?.ImageVideoData.filter(
      (item) => item.type === "image"
    ).map((item) => ({ url: item.url, publicKey: item.publicKey }));
    const videosWithKeys = data?.ImageVideoData.filter(
      (item) => item.type === "video"
    ).map((item) => ({ url: item.url, publicKey: item.publicKey }));
    const update_property = await Property.findByIdAndUpdate(data.id, {
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
      property_security_deposit: data.deposit,
      property_coordinates: {
        latitude: data.latitude,
        longitude: data.longitude,
      },
      images: imagesWithKeys,
      videos: videosWithKeys,
      preferred_tenants: data.prefferedTenant,
    });
    if (!update_property) {
      errorThrow("Failed to update property", 404);
    }
    res.status(200).json({ success: true });
  } catch (error) {
    next(error);
  }
});
module.exports = {
  AddProperty,
  get_properties,
  properties_landmark,
  getSinglePropertyDetail,
  get_landlord_properties,
  get_properties_info,
  delete_image,
  update_property,
};
