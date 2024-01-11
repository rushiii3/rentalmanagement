const express = require("express");
const router = express.Router();
const {AddBooking} = require('../Controller/PropertyBooking');
router.post('/add',AddBooking);
module.exports = router;