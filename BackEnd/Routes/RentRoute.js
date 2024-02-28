const express = require("express");
const router = express.Router();
const {GetRentData} = require("../Controller/RentController");
router.get('/tenant-rent/:id',GetRentData);
module.exports = router;