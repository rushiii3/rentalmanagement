const UserModel = require("../Models/UserModel");
const asyncHandler = require("express-async-handler");
const PropertyModel = require("../Models/PropertyModel");
const BookingModel = require("../Models/PropertyBooking");
const errorThrow = require("../Middleware/ErrorHandler");
const LeaseAgreement = require("../Models/LeaseAgreement");
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
        res.status(400).json({
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
const get_user_bookings_properties = asyncHandler(async (req, res, next) => {
  try {
    const ids = req.body;
    const property_data = await Promise.all(
      ids.map(async (data) => {
        const Bookings = await BookingModel.find({
          property_id: data,
        }).populate({
          path: "user_id",
          model: "User",
          select: "-_id firstname lastname avatar",
        });
        return { bookings: Bookings };
      })
    );
    res.status(200).json({ success: true, property_data });
  } catch (error) {
    next(error);
  }
});

const updateStatus = asyncHandler(async (req, res, next) => {
  try {
    const { id, type } = req.body;
    const update_status = await BookingModel.findByIdAndUpdate(id, {
      status: type,
    });

    if (!update_status) {
      // If update_status is null, the document with the specified ID was not found
      return errorThrow(
        "Failed to update property status! Booking not found.",
        404
      );
    }
    if (type === "Accepted") {
      const { user_id, property_id } = await BookingModel.findById(id);
      const {property_security_deposit,property_rent_price} = await PropertyModel.findById(property_id);
      const newLeaseAgreement = await LeaseAgreement.create({
        user_id: user_id,
        property_id: property_id,
        lease_start_date: null,
        lease_end_date: null,
        rent_amount: property_rent_price,
        security_deposit: property_security_deposit,
        aadhar_number: null,
        agreement_doc: null,
      });
      const UpdatePropertyRent = await PropertyModel.findByIdAndUpdate(property_id,{property_rented:true});
      if (newLeaseAgreement && UpdatePropertyRent) {
        res.status(200).json({ success: true });
      } else {
        errorThrow("Failed to update lease and rent", 404);
      }
    } else {
      res.status(200).json({ success: true });
        }
  } catch (error) {
    // Handle other errors, e.g., database connection issues
    next(error);
  }
});

module.exports = {
  AddBooking,
  get_user_bookings_properties,
  updateStatus,
};
