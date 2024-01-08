const asyncHandler = require("express-async-handler");
const ReviewModel = require('../Models/ReviewModel'); // Import your Review model
const UserModel = require('../Models/UserModel'); // Import your User model
const PropertyModel = require('../Models/UserModel'); // Import your Property model
const PhysicalVisitModel = require('../Models/PhysicalVisit');
const AddVisit = asyncHandler(async(req,res,next)=>{
    try {
        const {visitTime,visitDate,id,userid} = req.body;

        const newSchedule = new PhysicalVisitModel({
            pv_date: visitDate,
            pv_time: visitTime,
            pv_status: 'Pending',
            user_id: userid,
            property_id: id
        });
        const SavedSchedule = await newSchedule.save();
        if (SavedSchedule) {
          res.status(200).json({ success: true });
        } else {
          console.error('Failed to save property due to validation errors:', newProperty.errors);
          errorThrow('Failed to save property due to validation errors.', 500);
        }
    } catch (error) {
        next(error);
    }
    
})

module.exports = {
    AddVisit,
  };

