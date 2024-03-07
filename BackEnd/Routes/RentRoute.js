const express = require("express");
const router = express.Router();
const {GetRentData, add_rent, get_rents_for_property, add_rent_landlord} = require("../Controller/RentController");
router.get('/tenant-rent/:id',GetRentData);
router.post('/add-rent',add_rent);
router.post('/landlord-update-rent',add_rent_landlord);

router.get('/property-rents/:id',get_rents_for_property);



module.exports = router;