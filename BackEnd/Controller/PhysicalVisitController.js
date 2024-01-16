const asyncHandler = require("express-async-handler");
const ReviewModel = require('../Models/ReviewModel'); // Import your Review model
const UserModel = require('../Models/UserModel'); // Import your User model
const PropertyModel = require('../Models/UserModel'); // Import your Property model
const PhysicalVisitModel = require('../Models/PhysicalVisit');
const VideoConferenceModel = require('../Models/VideoConferenceModel');
const BookingModel = require('../Models/PropertyBooking');
const AddVisit = asyncHandler(async(req,res,next)=>{
    try {
        const {visitTime,visitDate,id,userid} = req.body;

        const newSchedule = new PhysicalVisitModel({
            pv_date: visitDate,
            pv_time: visitTime,
            pv_status: 'Pending',
            user_id: userid,
            property_id: id
        });
        const SavedSchedule = await newSchedule.save();
        if (SavedSchedule) {
          res.status(200).json({ success: true });
        } else {
          console.error('Failed to save property due to validation errors:', newProperty.errors);
          errorThrow('Failed to save property due to validation errors.', 500);
        }
    } catch (error) {
        next(error);
    }
    
})
const getUserPhysicalVisitFortenant = asyncHandler(async (req, res, next) => {
  try {
    const { id } = req.params; // Assuming userId is the user's ID
    const {_id} = await UserModel.findOne({email:id});
    const visits = await PhysicalVisitModel.find({ user_id: _id },{user_id:0,_v:0,_id:0})
      .populate({
        path: 'property_id',
        select: '_id property_no_of_bhk property_type building_name building_number property_streetname property_city property_state property_locality property_pincode images', // Select necessary fields
        populate: {
          path: 'landlord_id',
          model: 'User',
          select: '-_id firstname lastname',
        }
      })
      .exec();
      const video = await VideoConferenceModel.find({ user_id: _id },{user_id:0,_v:0,_id:0})
      .populate({
        path: 'property_id',
        select: '_id property_no_of_bhk property_type building_name building_number property_streetname property_city property_state property_locality property_pincode images', // Select necessary fields
        populate: {
          path: 'landlord_id',
          model: 'User',
          select: '-_id firstname lastname',
        }
      })
      .exec();
      const booking = await BookingModel.find({ user_id: _id },{user_id:0,_v:0,_id:0})
      .populate({
        path: 'property_id',
        select: '_id property_no_of_bhk property_type building_name building_number property_streetname property_city property_state property_locality property_pincode images', // Select necessary fields
        populate: {
          path: 'landlord_id',
          model: 'User',
          select: '-_id firstname lastname',
        }
      })
      .exec();
    // // Transform the visits array to retain only the URL of the first image
    const finalvisits = visits.map(visit => {
      if (visit.property_id && visit.property_id.images && visit.property_id.images.length > 0) {
        const { images, ...propertyWithoutImages } = visit.property_id.toObject(); // Destructure 'images' from 'property_id'
        return {
          ...visit.toObject(), // Convert Mongoose object to plain JavaScript object
          property_id: {
            ...propertyWithoutImages, // Exclude 'images' from 'property_id'
            image: visit.property_id.images[0].url // Retain only the URL of the first image
          }
        };
      }
      return visit;
    });
    const finalvideo = video.map(visit => {
      if (visit.property_id && visit.property_id.images && visit.property_id.images.length > 0) {
        const { images, ...propertyWithoutImages } = visit.property_id.toObject(); // Destructure 'images' from 'property_id'
        return {
          ...visit.toObject(), // Convert Mongoose object to plain JavaScript object
          property_id: {
            ...propertyWithoutImages, // Exclude 'images' from 'property_id'
            image: visit.property_id.images[0].url // Retain only the URL of the first image
          }
        };
      }
      return visit;
    });
    const finalbook = booking.map(booking => {
      if (booking.property_id && booking.property_id.images && booking.property_id.images.length > 0) {
        const { images, ...propertyWithoutImages } = booking.property_id.toObject(); // Destructure 'images' from 'property_id'
        return {
          ...booking.toObject(), // Convert Mongoose object to plain JavaScript object
          property_id: {
            ...propertyWithoutImages, // Exclude 'images' from 'property_id'
            image: booking.property_id.images[0].url // Retain only the URL of the first image
          }
        };
      }
      return booking;
    });
    res.status(200).json({ finalvisits,finalvideo,finalbook });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


module.exports = {
    AddVisit,
    getUserPhysicalVisitFortenant
  };

