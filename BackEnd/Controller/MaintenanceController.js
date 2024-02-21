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
      res.status(200).json({ success: true,id:savedRequest._id });
    } catch (error) {
      // Pass the error to the error handling middleware
      next(error);
    }
  });

  const get_maintenance_data = asyncHandler(async(req,res,next)=>{
    try {
      const {id} = req.params;
      const maintenance = await MaintenaceModel.find({property_id:id}).
      populate({
        path: 'user_id',
        select: 'firstname lastname avatar.url',
      });
      res.status(200).json({ success: true,maintenance });
    } catch (error) {
      next(error)
    }
  })
  const update_status = asyncHandler(async(req,res,next)=>{
    try {
      const { action, action_id } = req.body;
      const updated_maintenance_status  = await MaintenaceModel.findByIdAndUpdate(action_id,{request_status:action});
      if (!updated_maintenance_status) {
        errorThrow("Failed to update property status", 500);
      }
      res.status(200).json({ success: true });
    } catch (error) {
      
    }
  })
module.exports = {
    add_maintenance,
    get_maintenance_data,
    update_status
}