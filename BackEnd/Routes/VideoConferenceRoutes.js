const express = require("express");
const router = express.Router();
const { AddVisit} = require("../Controller/VideoConferenceController");

router.post('/add',AddVisit);

module.exports = router;