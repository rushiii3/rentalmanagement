const express = require("express");
const router = express.Router();
const {AddBooking,get_user_bookings_properties} = require('../Controller/PropertyBooking');
router.post('/add',AddBooking);
router.post('/get-bookings',get_user_bookings_properties);
module.exports = router;