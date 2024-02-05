const mongoose = require('mongoose');
const User = require("./UserModel");
const Property = require("./PropertyModel");
// Define schema for Video Conference
const videoConferenceSchema = new mongoose.Schema({
    vc_date: { type: Date, required: true },
    vc_time: { type: String, required: true },
    vc_link: { type: String,},
    vc_status: { type: String, required: true },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    property_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Property', required: true },
    addedAt: { type: Date, default: Date.now } 
});

// Create a model based on the schema
const VideoConference = mongoose.model('VideoConference', videoConferenceSchema);

module.exports = VideoConference;
