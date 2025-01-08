import { Schema, model } from "mongoose";

const FormDataSchema = new Schema({
  name: String,
  email: String,
  password: String,
  role: String,
});

const FormDataModel = model("log_reg_form", FormDataSchema);

export default FormDataModel;
