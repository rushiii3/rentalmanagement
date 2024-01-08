const asyncHandler = require("express-async-handler");
const UserModel = require('../Models/UserModel'); // Import your User model
const PropertyModel = require('../Models/UserModel'); // Import your Property model
const VideoConference = require('../Models/VideoConferenceModel');
const AddVisit = asyncHandler(async(req,res,next)=>{
    try {
        const {visitTime,visitDate,id,userid} = req.body;
        const newVideoConference = new VideoConference({
            vc_date: visitDate,
            vc_time: visitTime,
            vc_link: null,
            vc_status: 'Pending',
            user_id: userid,
            property_id: id
        });
        const SavedVideoConference = await newVideoConference.save();
        if (SavedVideoConference) {
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

