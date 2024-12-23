const mongoose = require("mongoose");

const OtpSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "FormDataModel",
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  expiresAt: {
    type: Date,
    required: true,
  },
});
const Otp = mongoose.model("Otp", OtpSchema);

module.exports = Otp;
