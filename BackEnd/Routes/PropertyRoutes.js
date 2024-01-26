const express = require("express");
const router = express.Router();
const { AddProperty,get_properties, properties_landmark,getSinglePropertyDetail,get_landlord_properties } = require("../Controller/PropertyController");
router.post("/add-property", AddProperty);
router.get("/properties", get_properties);
router.get("/properties-landmark", properties_landmark);
router.get("/property/:id",getSinglePropertyDetail);
router.get("/landlord-property/:id",get_landlord_properties)
module.exports = router;
