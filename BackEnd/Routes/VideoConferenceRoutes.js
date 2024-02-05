const express = require("express");
const router = express.Router();
const { AddVisit,get_user_bookings_properties} = require("../Controller/VideoConferenceController");

router.post('/add',AddVisit);
router.post('/get-bookings',get_user_bookings_properties);
module.exports = router;