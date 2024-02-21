const express = require("express");
const router = express.Router();
const { add_maintenance,get_maintenance_data,update_status } = require("../Controller/MaintenanceController");
router.post("/add-maintenance", add_maintenance);
router.get("/get-maintenance/:id",get_maintenance_data)
router.put("/update-maintenance-status", update_status);
module.exports = router;
