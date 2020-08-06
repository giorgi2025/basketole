const mongoose = require("mongoose")
const ObjectId = mongoose.Schema.Types.ObjectId;
const Schema = mongoose.Schema

const VerificationSchema = new mongoose.Schema({
  _userId: {
    type: ObjectId,
    required: true,
    ref: "User"
  },
  token: { type: String, required: true },
  createdAt: { type: Date, required: true, default: Date.now, expires: 43200 }
});
  
module.exports = VerifyUser = mongoose.model('verification', VerificationSchema)
