const asyncHandler = require("express-async-handler");
const hello = (req,res) => {
    res.status(200).json({msg:true});
}
const register = (req,res) => {
    console.log("yes");
    res.status(200).json({msg:true});
}
module.exports = {
    hello,
    register
}