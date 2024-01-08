const asyncHandler = require("express-async-handler");
const ReviewModel = require('../Models/ReviewModel'); // Import your Review model
const UserModel = require('../Models/UserModel'); // Import your User model
const PropertyModel = require('../Models/UserModel'); // Import your Property model
const PhysicalVisitModel = require('../Models/PhysicalVisit');
const AddVisit = asyncHandler(async(req,res,next)=>{
    console.log(req.body);
    const newSchedule = new Schedule({
        pv_date: new Date('2022-10-15'),
        pv_time: '14:00:00',
        pv_status: 'Pending',
        user_id: userId,
        property_id: propertyId
    });
    newProperty
      .save()
      .then((newSchedule) => {
        console.log("Property saved:", savedProperty);
      })
      .catch((error) => {
        console.error("Error saving property:", error);
      });
    res.status(200).json({success:true});
})

module.exports = {
    AddVisit,
  };

