const express = require("express");
const router = express.Router();
const { AddVisit,get_user_bookings_properties,updateStatus} = require("../Controller/VideoConferenceController");

router.post('/add',AddVisit);
router.post('/get-bookings',get_user_bookings_properties);
router.put('/update-status',updateStatus)
module.exports = router;