const errorThrow = require("../Middleware/ErrorHandler");
const asyncHandler = require("express-async-handler");
const LeaseModel = require("../Models/LeaseAgreement");
var mongoose = require("mongoose");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

cloudinary.config({
  cloud_name: "dmuhioahv",
  api_key: "166273865775784",
  api_secret: "blcMAs-77T_1t1VGnRIlLia_RqM",
  secure: true,
});
const get_lease_gata = asyncHandler(async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      errorThrow("Invalid Property Id", 404);
    }
    const LeaseData = await LeaseModel.find({ property_id: id }).populate({
      path: "user_id",
      model: "User",
      select: "-_id firstname lastname avatar",
    });
    console.log(id);
    res.status(200).json({ msg: true, LeaseData });
  } catch (error) {
    next(error);
  }
});
const Update_lease = asyncHandler(async (req, res, next) => {
  try {
    const data = req.body;
    const files = req.fileuplad;
    console.log("files", files.path);
    console.log("data", data);
    const result = await cloudinary.uploader
      .upload(files.path)
      .catch((error) => {
        errorThrow(error.message, 500);
      });
    console.log(result);

    fs.unlink(files.path, (err) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log("removed file");
      //file removed
    });
    const UpdatedLease = await LeaseModel.findByIdAndUpdate(data.id,{
        lease_start_date: data.startDate,
        lease_end_date: data.endDate,
        rent_amount: data.rentAmount,
        security_deposit: data.securityAmount,
        aadhar_number: data.tenantAadharCard,
        agreement_doc: result.secure_url, 
    });
    if(!UpdatedLease){
        errorThrow("Failed to upadte lease data", 500);
    }
    res.status(200).json({ success: true, doc:result.secure_url });

  } catch (error) {
    next(error);
  }
});
module.exports = {
  get_lease_gata,
  Update_lease,
};
