import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/cosmetic_db");
        console.log("MongoDB connected");
    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
    }
}

export default connectDB;