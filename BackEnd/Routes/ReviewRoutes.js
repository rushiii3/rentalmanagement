const express = require("express");
const router = express.Router();
const {AddReview} = require('../Controller/ReviewController');
router.post('/add-review',AddReview);
module.exports = router;
