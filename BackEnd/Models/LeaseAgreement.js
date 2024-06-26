const mongoose = require('mongoose');

// Define schema
const leaseAgreementSchema = new mongoose.Schema({
    lease_start_date: { type: Date },
    lease_end_date: { type: Date },
    rent_amount: { type: Number },
    security_deposit: { type: Number },
    aadhar_number: { type: String },
    agreement_doc: { type: String },
    lease_status : {type:String},
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    property_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Property', required: true },
});

// Define model
const LeaseAgreement = mongoose.model('LeaseAgreement', leaseAgreementSchema);

module.exports = LeaseAgreement;
