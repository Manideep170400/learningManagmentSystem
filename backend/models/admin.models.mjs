import { Schema, model } from "mongoose";

const adminSchema = new Schema({
  email: String,
  password: String,
});

const Admin = model("Admin", adminSchema);

export default Admin;
