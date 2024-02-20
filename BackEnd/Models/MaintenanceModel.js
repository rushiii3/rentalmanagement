const mongoose = require('mongoose');

// Define the schema
const requestSchema = new mongoose.Schema({
  emergency: {
    type: Boolean,
    required: true,
  },
  request_description: {
    type: String,
    required: true
  },
  date_of_request: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  request_status: {
    type: String,
    required: true,
    enum: ['Pending', 'Completed', 'InProgress', 'Rejected']
  },
  user_id: {
    type: String,
    ref: 'User',
    required: true
  },
  property_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Property', // Reference to another Mongoose model
    required: true
  }
});

// Create the model
const Request = mongoose.model('Request', requestSchema);

module.exports = Request;
