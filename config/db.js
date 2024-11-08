import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URL =
  process.env.MONGO_URL || "mongodb://localhost:27017/UnityBackend";

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1); // Exit with failure
  }
};

export default connectDB;
