const asyncHandler = require("express-async-handler");
const UserModel = require("../Models/UserModel"); // Import your User model
const Transaction = require("../Models/TransactonModel");
const errorThrow = require("../Middleware/ErrorHandler");

/* The `add_transaction` function is an asynchronous handler that handles the process of adding a new
transaction to the database. Here is a breakdown of what the function does: */
const add_transaction = asyncHandler(async (req, res, next) => {
  try {
    const { pay_id, amount, userEmail } = req.body;

    // Find the user by email
    const user = await UserModel.findOne({ email: userEmail });
    if (!user) {
      errorThrow("User email does not exist!", 400);
    }

    // Create new transaction
    const newTransactionData = new Transaction({
      amount: amount,
      pay_id: pay_id,
      user_id: user._id,
    });

    // Save the new transaction
    const insert_data = await newTransactionData.save();
    if (!insert_data) {
      errorThrow("Failed to add transaction data", 500);
    }
    const sum = user.creditPoint + amount;
    const udpdate_user_credits = await UserModel.findByIdAndUpdate(user._id, {
      creditPoint: sum,
    });
    if (!udpdate_user_credits) {
      errorThrow("Failed to add transaction data", 500);
    }
    res.status(201).json({ success: true });
  } catch (error) {
    next(error);
  }
});

module.exports = {
  add_transaction,
};
