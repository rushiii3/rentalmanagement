const asyncHandler = require("express-async-handler");
const UserModel = require("../Models/UserModel"); // Import your User model
const PropertyModel = require("../Models/UserModel"); // Import your Property model
const VideoConference = require("../Models/VideoConferenceModel");
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

module.exports = {
  AddVisit,
};
