const express = require("express");
const router = express.Router();
const { AddVisit, getUserPhysicalVisitFortenant} = require("../Controller/PhysicalVisitController");

router.post('/add',AddVisit);
router.get('/get-vist/:id',getUserPhysicalVisitFortenant);
module.exports = router;