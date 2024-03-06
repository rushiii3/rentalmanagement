const Admin = require("../Models/Admin"); // Importing the Admin model
const errorThrow = require("../Middleware/ErrorHandler");
const asyncHandler = require("express-async-handler");
const UserModel = require("../Models/UserModel");
const Property = require("../Models/PropertyModel");

const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: "dmuhioahv",
  api_key: "166273865775784",
  api_secret: "blcMAs-77T_1t1VGnRIlLia_RqM",
  secure: true,
});
const add_admin = asyncHandler(async (req, res, next) => {
  try {
    const {
      email,
      firstname,
      middlename,
      lastname,
      phoneno,
      role,
      password,
      streetname,
      state,
      city,
      pincode,
      profile,
      joiningDate,
    } = req.body;
    const userExists = await Admin.findOne({ email });
    if (userExists) {
      errorThrow("Admin email already exists!", 400);
    }

    const options = {
      use_filename: true,
      unique_filename: true,
      overwrite: true,
    };
    const image = profile;

    const result = await cloudinary.uploader.upload(image).catch((error) => {
      errorThrow(error.message, 500);
    });

    if (!result) {
      errorThrow("Failed to upload the image", 500);
    }

    const image_id = result.public_id;
    const image_link = result.secure_url;

    const user = await Admin.create({
      firstname,
      middlename,
      lastname,
      email,
      phoneNumber: phoneno,
      role,
      password,
      avatar: {
        public_id: image_id,
        url: image_link,
      },
      address: {
        streetname: streetname,
        city: city,
        state: state,
        pincode: pincode,
      },
      joiningDate,
      isCurrentlyEmployee: true,
    });
    if (!user) {
      errorThrow("Internal error while creating user", 500);
    }

    res.status(201).json({ success: true, message: "User Added Successfully" });
  } catch (error) {
    next(error);
  }
});
const deleteuser = asyncHandler(async (req, res, next) => {
  try {
    const { id } = req.params;
    const admin = await Admin.findById(id);
    if (!admin) {
      errorThrow("No user found", 404);
    }
    const delete_admin = await Admin.findByIdAndDelete(id);
    if (!delete_admin) {
      errorThrow("Failed to delete admin", 500);
    }
    res.status(201).json({ success: true });
  } catch (error) {}
});

const get_user_details = asyncHandler(async (id) => {
  const user = await UserModel.findById(id);
  return user;
});
const get_data = asyncHandler(async (req, res, next) => {
  try {
    const countUsers = UserModel.countDocuments();
    const countAdmins = Admin.countDocuments();
    const countT = UserModel.countDocuments({ role: "T" });
    const countL = UserModel.countDocuments({ role: "L" });
    const countProperty = Property.countDocuments();
    const countPropertyRented = Property.countDocuments({
      property_rented: true,
    });
    const landlordWithMostRentedProperties = await Property.aggregate([
      // Match properties that are rented
      { $match: { property_rented: true } },
      // Group by landlord
      { $group: { _id: "$landlord_id", rentedProperties: { $sum: 1 } } },
      // Sort by rentedProperties in descending order
      { $sort: { rentedProperties: -1 } },
      // Limit to 1 document (the highest count)
      { $limit: 1 },
    ]);
    const landlordWithMostRentedPropertiesDeatils = get_user_details(
      landlordWithMostRentedProperties[0]._id
    );
    const landlordWithMostProperties = await Property.aggregate([
      // Group by landlord
      { $group: { _id: "$landlord_id", totalProperties: { $sum: 1 } } },
      // Sort by totalProperties in descending order
      { $sort: { totalProperties: -1 } },
      // Limit to 1 document (the highest count)
      { $limit: 1 },
    ]);
    const landlordWithMostPropertiesUsers = get_user_details(
      landlordWithMostProperties[0]._id
    );
    // Execute the queries
    const [
      countUsersResult,
      countAdminsResult,
      countTResult,
      countLResult,
      countPropertyResult,
      countPropertyRentedResult,
      landlordWithMostRentedPropertiesResult,
      landlordWithMostRentedPropertiesDeatilsResult,
      landlordWithMostPropertiesUsersResult
    ] = await Promise.all([
      countUsers,
      countAdmins,
      countT,
      countL,
      countProperty,
      countPropertyRented,
      landlordWithMostRentedProperties,
      landlordWithMostRentedPropertiesDeatils,
      landlordWithMostPropertiesUsers
    ]);
console.log(landlordWithMostRentedProperties);

    // Send response to client
    res.status(200).json({
      countT: countTResult,
      countL: countLResult,
      countProperty: countPropertyResult,
      countPropertyRented: countPropertyRentedResult,
      countUsers: countUsersResult,
      countAdmins: countAdminsResult,
      landlordWithMostRentedProperties: {
        rentedProperties:landlordWithMostRentedProperties[0].rentedProperties,
        firstname: landlordWithMostRentedPropertiesDeatilsResult.firstname,
      lastname: landlordWithMostRentedPropertiesDeatilsResult.lastname,
      url: landlordWithMostRentedPropertiesDeatilsResult.avatar.url,
      },
      landlordWithMostPropertiesUsersResult:{
        total:landlordWithMostProperties[0].totalProperties,
        firstname: landlordWithMostPropertiesUsersResult.firstname,
        lastname: landlordWithMostPropertiesUsersResult.lastname,
        url: landlordWithMostPropertiesUsersResult.avatar.url,
      }
    });
  } catch (error) {
    console.error("Error counting:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = {
  add_admin,
  deleteuser,
  get_data,
};
