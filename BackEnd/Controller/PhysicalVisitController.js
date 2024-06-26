const asyncHandler = require("express-async-handler");
const ReviewModel = require("../Models/ReviewModel"); // Import your Review model
const UserModel = require("../Models/UserModel"); // Import your User model
const PropertyModel = require("../Models/UserModel"); // Import your Property model
const PhysicalVisitModel = require("../Models/PhysicalVisit");
const VideoConferenceModel = require("../Models/VideoConferenceModel");
const BookingModel = require("../Models/PropertyBooking");
const errorThrow = require("../Middleware/ErrorHandler");

/* The `AddVisit` function is an asynchronous handler that handles the process of adding a physical
visit booking. Here's a breakdown of what the function does: */
const AddVisit = asyncHandler(async (req, res, next) => {
  try {
    const { visitTime, visitDate, id, userid } = req.body;
    const existingBookings = await PhysicalVisitModel.find({
      user_id: userid,
      property_id: id,
    });
    if (existingBookings.length > 0) {
      // User has existing bookings for the same property
      const isOneMonthLater = existingBookings.filter((booking) => {
        const bookingDateObj = new Date(booking.pv_date);
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
          booking.pv_status === "Pending" ||
          booking.pv_status === "Accepted" ||
          booking.pv_status === "Completed"
      );
      if (pendingBooking.length > 0) {
        res.status(400).json({
          success: false,
          message: `You already have a booking that is currently in a ${pendingBooking[0].pv_status.toLocaleLowerCase()} status.`,
        });
      } else {
        AddData(visitTime, visitDate, id, userid);
      }
    } else {
      AddData(visitTime, visitDate, id, userid);
    }
    async function AddData(visitTime, visitDate, id, userid) {
      const newSchedule = new PhysicalVisitModel({
        pv_date: visitDate,
        pv_time: visitTime,
        pv_status: "Pending",
        user_id: userid,
        property_id: id,
      });
      const SavedSchedule = await newSchedule.save();
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

/* The above code is a JavaScript function that handles a request to get physical visits, video
conferences, and bookings for a specific user. Here is a breakdown of what the code does: */
const getUserPhysicalVisitFortenant = asyncHandler(async (req, res, next) => {
  try {
    const { id } = req.params; // Assuming userId is the user's ID
    const { _id } = await UserModel.findOne({ email: id });
    const visits = await PhysicalVisitModel.find(
      { user_id: _id },
      { user_id: 0, _v: 0, _id: 0 }
    )
      .populate({
        path: "property_id",
        select:
          "_id property_no_of_bhk property_type building_name building_number property_streetname property_city property_state property_locality property_pincode images", // Select necessary fields
        populate: {
          path: "landlord_id",
          model: "User",
          select: "-_id firstname lastname",
        },
      })
      .exec();
    const video = await VideoConferenceModel.find(
      { user_id: _id },
      { user_id: 0, _v: 0, _id: 0 }
    )
      .populate({
        path: "property_id",
        select:
          "_id property_no_of_bhk property_type building_name building_number property_streetname property_city property_state property_locality property_pincode images", // Select necessary fields
        populate: {
          path: "landlord_id",
          model: "User",
          select: "-_id firstname lastname",
        },
      })
      .exec();
    const booking = await BookingModel.find(
      { user_id: _id },
      { user_id: 0, _v: 0, _id: 0 }
    )
      .populate({
        path: "property_id",
        select:
          "_id property_no_of_bhk property_type building_name building_number property_streetname property_city property_state property_locality property_pincode images", // Select necessary fields
        populate: {
          path: "landlord_id",
          model: "User",
          select: "-_id firstname lastname",
        },
      })
      .exec();
    // // Transform the visits array to retain only the URL of the first image
    const finalvisits = visits.map((visit) => {
      if (
        visit.property_id &&
        visit.property_id.images &&
        visit.property_id.images.length > 0
      ) {
        const { images, ...propertyWithoutImages } =
          visit.property_id.toObject(); // Destructure 'images' from 'property_id'
        return {
          ...visit.toObject(), // Convert Mongoose object to plain JavaScript object
          property_id: {
            ...propertyWithoutImages, // Exclude 'images' from 'property_id'
            image: visit.property_id.images[0].url, // Retain only the URL of the first image
          },
        };
      }
      return visit;
    });
    const finalvideo = video.map((visit) => {
      if (
        visit.property_id &&
        visit.property_id.images &&
        visit.property_id.images.length > 0
      ) {
        const { images, ...propertyWithoutImages } =
          visit.property_id.toObject(); // Destructure 'images' from 'property_id'
        return {
          ...visit.toObject(), // Convert Mongoose object to plain JavaScript object
          property_id: {
            ...propertyWithoutImages, // Exclude 'images' from 'property_id'
            image: visit.property_id.images[0].url, // Retain only the URL of the first image
          },
        };
      }
      return visit;
    });
    const finalbook = booking.map((booking) => {
      if (
        booking.property_id &&
        booking.property_id.images &&
        booking.property_id.images.length > 0
      ) {
        const { images, ...propertyWithoutImages } =
          booking.property_id.toObject(); // Destructure 'images' from 'property_id'
        return {
          ...booking.toObject(), // Convert Mongoose object to plain JavaScript object
          property_id: {
            ...propertyWithoutImages, // Exclude 'images' from 'property_id'
            image: booking.property_id.images[0].url, // Retain only the URL of the first image
          },
        };
      }
      return booking;
    });
    res.status(200).json({ finalvisits, finalvideo, finalbook });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/* The `get_user_bookings_properties` function is an asynchronous handler that retrieves booking
information for multiple properties based on the provided property IDs. Here's a breakdown of what
the function does: */
const get_user_bookings_properties = asyncHandler(async (req, res, next) => {
  try {
    const ids = req.body;
    const property_data = await Promise.all(
      ids.map(async (data) => {
        const Bookings = await PhysicalVisitModel.find({
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

/* The `updateStatus` function is an asynchronous handler that updates the status of a physical visit
booking based on the provided ID and type. Here's a breakdown of what the function does: */
const updateStatus = asyncHandler(async (req, res, next) => {
  try {
    const { id, type } = req.body;
    const update_status = await PhysicalVisitModel.findByIdAndUpdate(id, {
      pv_status: type,
    });

    if (!update_status) {
      // If update_status is null, the document with the specified ID was not found
      return errorThrow(
        "Failed to update property status! Booking not found.",
        404
      );
    }

    res.status(200).json({ success: true });
  } catch (error) {
    // Handle other errors, e.g., database connection issues
    next(error);
  }
});

module.exports = {
  AddVisit,
  getUserPhysicalVisitFortenant,
  get_user_bookings_properties,
  updateStatus,
};
