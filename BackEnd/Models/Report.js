const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
  report_title: {
    type: String,
    required: true
  },
  report_type: {
    type: String,
    required: true
  },
  report_description: {
    type: String,
    required: true
  },
  report_date: {
    type: Date,
    default: Date.now // Set default value to the current date/time when the report is added
  },
  report_status: {
    type: String,
    enum: ["Pending", "Resolved", "Closed", "Unresolvable"],
    default: "Pending"
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId, // Assuming it references user collection
    required: true
  },
  admin_email: {
    type: mongoose.Schema.Types.ObjectId, // Assuming it references admin collection
    required: true
  }
});

module.exports = mongoose.model("Report", reportSchema);
