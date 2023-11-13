const asyncHandler = require("express-async-handler");
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: "dmuhioahv",
  api_key: "166273865775784",
  api_secret: "blcMAs-77T_1t1VGnRIlLia_RqM",
  secure: true,
});
const hello = (req,res) => {
    res.status(200).json({msg:true});
}
const register = asyncHandler(async(req,res)=>{
   const data = req.body;
    const options = {
        use_filename: true,
        unique_filename: true,
        overwrite: true,
      };
      const image = data.profile;
      const result = await cloudinary.uploader.upload(image,{ width: 100, crop: "scale", fetch_format: "auto" }).catch((error) => {
        res.status(500);
        throw new Error(error.message);
      });
      if (!result) {
        res.status(500);
        throw new Error("Failed to upload the image");
      }
    res.status(200).json({msg:result});
}) 
module.exports = {
    hello,
    register
}