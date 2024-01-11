const UserModel = require("../Models/UserModel");
const asyncHandler = require("express-async-handler");
const PropertyModel = require("../Models/UserModel");
const BookingModel = require("../Models/PropertyBooking");
const AddBooking = asyncHandler(async (req, res, next) => {
    try {
        const data = req.body;
    } catch (error) {
        
    }
});
module.exports = {
    AddBooking,
}
