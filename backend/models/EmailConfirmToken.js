const mongoose = require("mongoose")
const ObjectId = mongoose.Schema.Types.ObjectId;
const Schema = mongoose.Schema

const EmailVerificationSchema = new mongoose.Schema({
    email: {
      type: String,
      required: true
    },
    token: { type: String, required: true },
    createdAt: { type: Date, required: true, default: Date.now, expires: 43200 }
  });
  
  module.exports = VerifyUser = mongoose.model('EmailVerification', EmailVerificationSchema)
 


