const errorThrow = require("../Middleware/ErrorHandler");
const asyncHandler = require("express-async-handler");
const PropertyBooking = require("../Models/PropertyModel");
const MaintenaceModel = require("../Models/MaintenanceModel");
var mongoose = require("mongoose");
const add_maintenance = asyncHandler(async (req, res, next) => {
    try {
      const { description, emergency, user_id, property_id } = req.body;
  
      // Create a new maintenance request instance
      const newRequest = new MaintenaceModel({
        emergency: emergency,
        request_description: description,
        request_status: 'Pending',
        user_id: user_id,
        property_id: property_id // Assuming this is a valid ObjectId
      });
  
      // Save the new maintenance request to the database
      const savedRequest = await newRequest.save();
      if(!savedRequest){
        errorThrow("Error inserting maintenance",500);
      }
      // Send a success response
      res.status(200).json({ success: true });
    } catch (error) {
      // Pass the error to the error handling middleware
      next(error);
    }
  });
  
module.exports = {
    add_maintenance
}