const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const User = require("../Models/UserModel");
const Admin = require("../Models/Admin");
const Report = require("../Models/Report");
const errorThrow = require("../Middleware/ErrorHandler");
const add = asyncHandler(async (req, res, next) => {
  try {
    console.log(req.body);
    const { title, description, filter, user_id } = req.body;
    const newReport = new Report({
      report_title: title,
      report_description: description,
      report_type: filter,
      user_id: user_id, // Provide the ObjectId of the user
      admin_email: "65c8e33d10465219d1f19fcb", // Provide the ObjectId of the admin
    });
    // Save the report to the database
    newReport
      .save()
      .then((report) => {
        res.status(201).json({ success: true });
      })
      .catch((error) => {
        errorThrow(500, error.message);
        //   res.status(500).json({ success: false, error: error.message });
      });
  } catch (error) {
    next(error);
  }
});
const get_data = asyncHandler(async (req, res, next) => {
  try {
    const {id} = req.params;
    const report = await Report.find({user_id:id},{user_id:0,admin_email:0,_id:0});
      res.status(201).json({ success: true,report});
  } catch (error) {
    next(error);
  }
});

const get_report_data_admin = asyncHandler(async(req,res,next)=>{
  try {
    const {id,type} = req.params;
    console.log(type);
    const reports = await Report.find({admin_email:id,report_type:type}).populate({
      path: "user_id",
      model: "User",
      select: "-_id firstname lastname avatar",
    });
    res.status(201).json({ success: true,reports});
  } catch (error) {
    next(error)
  }

})
module.exports = {
  add,
  get_data,
  get_report_data_admin
};
