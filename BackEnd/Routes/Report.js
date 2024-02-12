const express = require("express");
const router = express.Router();
const {add,get_data} = require("../Controller/Report");
router.post('/add',add);
router.get('/get-data/:id',get_data);

module.exports = router;