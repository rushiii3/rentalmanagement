const asyncHandler = require("express-async-handler");
const UserModel = require("../Models/UserModel"); // Import your User model
const PropertyModel = require("../Models/UserModel"); // Import your Property model
const VideoConference = require("../Models/VideoConferenceModel");
const errorThrow = require("../Middleware/ErrorHandler");
var mongoose = require('mongoose');

const AddVisit = asyncHandler(async (req, res, next) => {
  try {
    const { visitTime, visitDate, id, userid } = req.body;
    const existingBookings = await VideoConference.find({
      user_id: userid,
      property_id: id,
    });
    if (existingBookings.length > 0) {
      // User has existing bookings for the same property
      const isOneMonthLater = existingBookings.filter((booking) => {
        const bookingDateObj = new Date(booking.vc_date);
        const oneMonthLater = new Date();
        oneMonthLater.setMonth(oneMonthLater.getMonth() - 1);
        if (bookingDateObj > oneMonthLater) {
          return true;
        } else {
          return false;
        }
      });
      const pendingBooking = isOneMonthLater.filter(
        (booking) =>
          booking.vc_status === "Pending" ||
          booking.vc_status === "Accepted" ||
          booking.vc_status === "Completed"
      );
      if (pendingBooking.length > 0) {
        res.status(400).json({
          success: false,
          message: `You already have a booking that is currently in a ${pendingBooking[0].vc_status.toLocaleLowerCase()} status.`,
        });
      } else {
        AddData(visitTime, visitDate, id, userid);
      }
    } else {
      AddData(visitTime, visitDate, id, userid);
    }
    async function AddData(visitTime, visitDate, id, userid) {
      const newVideoConference = new VideoConference({
        vc_date: visitDate,
        vc_time: visitTime,
        vc_link: null,
        vc_status: "Pending",
        user_id: userid,
        property_id: id,
      });
      const SavedSchedule = await newVideoConference.save();
      if (SavedSchedule) {
        res.status(200).json({ success: true });
      } else {
        console.error(
          "Failed to save property due to validation errors:",
          newProperty.errors
        );
        errorThrow("Failed to save property due to validation errors.", 500);
      }
    }
  } catch (error) {
    next(error);
  }
});
const get_user_bookings_properties = asyncHandler(async (req, res, next) => {
  try {
    const ids = req.body;
    const property_data = await Promise.all(ids.map(async (data) => {
      const Bookings = await VideoConference.find({
        property_id: data,
      }).populate({
        path: "user_id",
        model:"User",
        select: "-_id firstname lastname avatar",
      });
      return { bookings: Bookings };
    }));
    res.status(200).json({ success: true, property_data });
  } catch (error) {
    next(error);
  }
});
const updateStatus = asyncHandler(async(req,res,next)=>{
  try {
    const { id, type } = req.body;
    const update_status = await VideoConference.findByIdAndUpdate(id, { vc_status: type });
    if (!update_status) {
      // If update_status is null, the document with the specified ID was not found
      return errorThrow("Failed to update property status! Booking not found.", 404);
    }
    res.status(200).json({ success: true });
  } catch (error) {
    // Handle other errors, e.g., database connection issues
    next(error);
  }
})
const GetVideoConferenceData = asyncHandler(async(req,res,next)=>{
  try {
    const {id} = req.params;
    console.log("hehe");
    
    if(!mongoose.Types.ObjectId.isValid(id)){
      errorThrow("Invalid Meeting ID", 404);
    }
    const verify = await VideoConference.findById(id).populate({
      path: "property_id",
      select: "_id", // Select necessary fields
      populate: {
        path: "landlord_id",
        model: "User",
        select: "_id firstname lastname",
      },
    })
    .exec();
    
    res.status(200).json({ success: true, verify });
  } catch (error) {
    next(error);
  }
})
module.exports = {
  AddVisit,
  get_user_bookings_properties,
  updateStatus,
  GetVideoConferenceData
};
