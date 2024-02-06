const express = require("express");
const router = express.Router();
const { AddVisit, getUserPhysicalVisitFortenant,get_user_bookings_properties,updateStatus} = require("../Controller/PhysicalVisitController");

router.post('/add',AddVisit);
router.get('/get-vist/:id',getUserPhysicalVisitFortenant);
router.post('/get-bookings',get_user_bookings_properties);
router.put('/update-status',updateStatus)
module.exports = router;