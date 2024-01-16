const mongoose = require('mongoose');
const User = require("./UserModel");
const Property = require("./PropertyModel");
// Define schema for the schedule
const scheduleSchema = new mongoose.Schema({
    pv_date: { type: Date, required: true },
    pv_time: { type: String, required: true },
    pv_status: { type: String, required: true },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    property_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Property', required: true },
    addedAt: { type: Date, default: Date.now } 
});

// Create models based on the schemas
const Schedule = mongoose.model('Schedule', scheduleSchema);
module.exports = Schedule;


