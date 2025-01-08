import { Schema, model } from "mongoose";

const OtpSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
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
const Otp = model("Otp", OtpSchema);

export default Otp;
