const express = require("express");
const router = express.Router();
const { AddVisit} = require("../Controller/PhysicalVisitController");

router.post('/add',AddVisit);

module.exports = router;