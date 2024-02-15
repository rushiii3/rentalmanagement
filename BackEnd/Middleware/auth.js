const jwt = require("jsonwebtoken");
const User = require('../Models/UserModel');
const asyncHandler = require("express-async-handler");
const errorThrow = require("../Middleware/ErrorHandler");
const Admin = require('../Models/Admin');
exports.isAuthenticated = asyncHandler(async(req,res,next) =>{
    const {token} = req.cookies;
    if(!token){
        return next(errorThrow("Please provide the correct information", 401));
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded._id) || await Admin.findById(decoded._id);
    next();
})