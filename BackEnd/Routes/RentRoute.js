const express = require("express");
const router = express.Router();
const {GetRentData, add_rent} = require("../Controller/RentController");
router.get('/tenant-rent/:id',GetRentData);
router.post('/add-rent',add_rent);


module.exports = router;