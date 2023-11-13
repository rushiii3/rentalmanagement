const express = require("express");
const router = express.Router();
const asyncHandler = require('express-async-handler');
const {hello,register} = require('../Controller/UserController');
router.get('/hehe',hello);
router.post('/register',register);
module.exports = router