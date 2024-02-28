const express = require("express");
const router = express.Router();
const {add_transaction} = require('../Controller/TransactionController');
router.post('/add-transaction',add_transaction);
module.exports = router;