const mongoose = require('mongoose');
const Users = require('./UserModel');
// Define the ChatMessage schema
const chatMessageSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users", // Reference to the User model  // You can use a User schema reference if you have a User model
    required: true,
  },
  reciver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users", // You can use a User schema reference if you have a User model
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

// Create a ChatMessage model using the schema
const ChatMessage = mongoose.model('ChatMessage', chatMessageSchema);

module.exports = ChatMessage;
