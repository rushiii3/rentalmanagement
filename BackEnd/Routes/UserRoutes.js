const express = require("express");
const router = express.Router();
const asyncHandler = require('express-async-handler');
const {hello, register, activation, login, getUser, forgotpassword, verifyotp, changeforgotpassword,UserProfileImageUpdate,get_user,update_user_info} = require('../Controller/UserController');
const { isAuthenticated } = require("../Middleware/auth");
router.get('/hehe',hello);
router.post('/register',register);
router.post('/activation',activation);
router.post('/login',login);
router.get('/getuser',isAuthenticated,getUser)
router.post('/forgot-password',forgotpassword);
router.post('/verify-otp',verifyotp);
router.post('/change-forgot-password',changeforgotpassword);
router.put('/profile-image',UserProfileImageUpdate);
router.post('/get-user',get_user);
router.put('/update-user-info',update_user_info);
module.exports = router