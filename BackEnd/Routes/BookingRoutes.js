const express = require("express");
const router = express.Router();
const {AddBooking,get_user_bookings_properties,updateStatus} = require('../Controller/PropertyBooking');
router.post('/add',AddBooking);
router.post('/get-bookings',get_user_bookings_properties);
router.put('/update-status',updateStatus)
module.exports = router;