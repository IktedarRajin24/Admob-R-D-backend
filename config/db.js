import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    await mongoose
      .connect(MONGO_URI)
      .then(() => console.log("Connected to MongoDB Atlas"))
      .catch((error) => console.error("MongoDB connection error:", error));
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1); // Exit with failure
  }
};

export default connectDB;
