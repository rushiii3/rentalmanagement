const express = require("express");
const router = express.Router();
const {
  AddProperty,
  get_properties,
  properties_landmark,
  getSinglePropertyDetail,
  get_landlord_properties,
  get_properties_info,
  delete_image,
  update_property
} = require("../Controller/PropertyController");
router.post("/add-property", AddProperty);
router.get("/properties", get_properties);
router.get("/properties-landmark", properties_landmark);
router.get("/property/:id", getSinglePropertyDetail);
router.get("/landlord-property/:id", get_landlord_properties);
router.get("/get-properties/:id", get_properties_info);
router.post("/delete-image", delete_image);
router.put("/update-property", update_property);



module.exports = router;
