const UserModel = require("../Models/UserModel");
const asyncHandler = require("express-async-handler");
const PropertyModel = require("../Models/UserModel");
const BookingModel = require("../Models/PropertyBooking");
const AddBooking = asyncHandler(async (req, res, next) => {
    try {
        const data = req.body;
        const newBooking = new BookingModel({
            user_id: data.userid,
            property_id: data.property_id
        })
        const SavedBooking = await newBooking.save();
        if (SavedBooking) {
          res.status(200).json({ success: true });
        } else {
          console.error('Failed to save property due to validation errors:', newBooking.errors);
          errorThrow('Failed to save property due to validation errors.', 500);
        }
    } catch (error) {
        console.log(error);
        next(error)
    }
});
module.exports = {
    AddBooking,
}
