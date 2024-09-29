import mongoose from "mongoose";
export const connectDb = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/ms-hacker");
    console.log("MongoDB Connected");
  } catch (error) {
    console.log(error);
    process.exit();
  }
};
