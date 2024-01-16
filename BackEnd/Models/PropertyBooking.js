const mongoose = require('mongoose');
const User = require("./UserModel");
const Property = require("./PropertyModel");
const BookingSchema = new mongoose.Schema({
    booking_date: { type: Date, default: Date.now, required: true },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    property_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Property', required: true },
    status: { type: String, required: true },
});
// Create models based on the schemas
const Bookings = mongoose.model('Bookings', BookingSchema);
module.exports = Bookings;