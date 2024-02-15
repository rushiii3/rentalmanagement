const express = require("express");
const router = express.Router();
const {add,get_data,get_report_data_admin} = require("../Controller/Report");
router.post('/add',add);
router.get('/get-data/:id',get_data);
router.get('/get-admin-reports/:type/:id',get_report_data_admin)
module.exports = router;