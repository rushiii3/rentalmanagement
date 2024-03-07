const express = require("express");
const router = express.Router();
const {AddReview,get_tenants_review} = require('../Controller/ReviewController');
router.post('/add-review',AddReview);
router.get("/get-reviews/:id",get_tenants_review);
module.exports = router;
