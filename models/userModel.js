import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    country: String,
  },
  { collection: "Users" }
);

export default mongoose.model("Users", userSchema);
