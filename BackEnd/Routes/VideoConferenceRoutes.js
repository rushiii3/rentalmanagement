const express = require("express");
const router = express.Router();
const { AddVisit,get_user_bookings_properties,updateStatus,GetVideoConferenceData} = require("../Controller/VideoConferenceController");

router.post('/add',AddVisit);
router.post('/get-bookings',get_user_bookings_properties);
router.put('/update-status',updateStatus)
router.get('/verify-video-conference/:id',GetVideoConferenceData)
module.exports = router;