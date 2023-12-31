import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
});

const userModel = mongoose.model("users", userSchema);
export default userModel;
