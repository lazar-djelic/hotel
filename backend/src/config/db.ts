import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const mongo_uri: string = process.env.MONGO_URI!;
    await mongoose.connect(mongo_uri);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB ", error);
    process.exit(1);
  }
};
