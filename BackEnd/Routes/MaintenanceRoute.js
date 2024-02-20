const express = require("express");
const router = express.Router();
const { add_maintenance } = require("../Controller/MaintenanceController");
router.post("/add-maintenance", add_maintenance);
module.exports = router;
