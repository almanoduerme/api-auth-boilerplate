import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

// MongoDB connection
const MONGO_URI: string = process.env.MONGO_DATABASE_URL || "";

const connectMongoDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error", error);
  }
};

export { connectMongoDB };
