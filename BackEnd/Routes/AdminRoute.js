const express = require("express");
const router = express.Router();
const {addAdmin} = require("../Controller/Admin");
router.post('/add',addAdmin);
module.exports = router;