import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

// Validate MONGO_URI presence
if (!process.env.MONGO_URI) {
    throw new Error("Please provide MONGO_URI in the .env file.");
}

const connectDB = async () => {
    try {
        // Connect to MongoDB with options for better compatibility
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error("MongoDB connection error:", error.message);

        // Exit process only in non-production environments
        if (process.env.NODE_ENV !== "production") {
            process.exit(1);
        } else {
            throw new Error("Unable to connect to MongoDB in production.");
        }
    }
};

export default connectDB;
