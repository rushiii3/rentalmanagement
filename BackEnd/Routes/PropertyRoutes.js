const express = require("express");
const router = express.Router();
const { AddProperty,get_properties } = require("../Controller/PropertyController");
router.post("/add-property", AddProperty);
router.get("/properties", get_properties);
module.exports = router;
