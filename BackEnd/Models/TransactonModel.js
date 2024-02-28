const mongoose = require("mongoose");
const User = require("./UserModel");
const TransactonSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true
  },
  pay_id: {
    type: String,
    required: true
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // This refers to the 'User' model
    required: true
  },
  added:{
    type:Date,
    default: Date.now
  }
});

const Transaction = mongoose.model('Transaction', TransactonSchema);

module.exports = Transaction;
