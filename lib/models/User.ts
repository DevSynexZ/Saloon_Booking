import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true ,index:true},
  password: { type: String, required: true },
  name: { type: String },
}, { timestamps: true });

export default mongoose.models.User || mongoose.model("User", UserSchema);