const UserModel = require("../Models/UserModel");
const asyncHandler = require("express-async-handler");
const PropertyModel = require("../Models/UserModel");
const BookingModel = require("../Models/PropertyBooking");
const AddBooking = asyncHandler(async (req, res, next) => {
  try {
    const data = req.body;
    // Check if the user has already sent a booking for the same property
    const existingBookings = await BookingModel.find({
      user_id: data.userid,
      property_id: data.property_id,
    });
    if (existingBookings.length > 0) {
      // User has existing bookings for the same property
      const isOneMonthLater = existingBookings.filter((booking) => {
        const bookingDateObj = new Date(booking.booking_date);
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
          booking.status === "Pending" ||
          booking.status === "Accepted" ||
          booking.status === "Completed"
      );
      if (pendingBooking.length > 0) {
        res
          .status(400)
          .json({
            success: false,
            message: `You already have a booking that is currently in a ${pendingBooking[0].status.toLocaleLowerCase()} status.`,
          });
      } else {
        AddData(data);
      }
    } else {
      AddData(data);
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
  async function AddData(data) {
    const newBooking = new BookingModel({
      user_id: data.userid,
      property_id: data.property_id,
      status: "Pending",
    });

    const savedBooking = await newBooking.save();

    if (savedBooking) {
      res.status(200).json({ success: true });
    } else {
      console.error(
        "Failed to save property due to validation errors:",
        newBooking.errors
      );
      errorThrow("Failed to save property due to validation errors.", 500);
    }
  }
});
module.exports = {
  AddBooking,
};
