import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/express_project");

    console.log("Connected to the Database");
  } catch (error) {
    console.log(`Database connection error: ${error}`);

    process.exit(1);
  }
};

export default connectDB;
