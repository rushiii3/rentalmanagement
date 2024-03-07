const mongoose = require("mongoose");
const User = require("./UserModel");
const CreditSchema = new mongoose.Schema({
  creditPoints: {
    type: Number,
    required: true,
  },
  sender_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Assuming it references user collection
    required: true,
  },
  receiver_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Assuming it references admin collection
    required: true,
  },
  addedDate: {
    type: Date,
    default: Date.now, // Set default value to the current date/time when the report is added
  },
});

module.exports = mongoose.model("Credit", CreditSchema);
