import mongoose from "mongoose";

export const connectMongo = async () => {
    const mongoUri = process.env.MONGO_URI as string ?? "mongodb://localhost:27017/accessibility-analyzer";

    try {
        await mongoose.connect(mongoUri);
        console.log("Connected to MongoDB", mongoUri);
    } catch (error) {
        console.error("Error connecting to MongoDB", error);
        process.exit(1);
    }
};