const express = require("express");
const router = express.Router();
const { AddProperty,get_properties, properties_landmark } = require("../Controller/PropertyController");
router.post("/add-property", AddProperty);
router.get("/properties", get_properties);
router.get("/properties-landmark", properties_landmark);
module.exports = router;
