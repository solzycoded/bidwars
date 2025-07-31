/* RESP: CREATE AND INITIALIZE DATABASE */
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDB = async () => {
    if (process.env.NODE_ENV === 'test') return;

    try {
        const { MONGO_DB_PASSWORD, MONGO_USERNAME, MONGO_APP_NAME } = process.env; // mongod db connection variables

        const url = `mongodb+srv://${MONGO_USERNAME}:${MONGO_DB_PASSWORD}@${MONGO_APP_NAME}.1w4ft.mongodb.net/?retryWrites=true&w=majority&appName=${MONGO_APP_NAME}`; // connection url

        await mongoose.connect(url); // connect to mongodb
        console.log("Database Created");
    } catch (err) {
        console.error("MongoDB connection error:", err);
    }
}

export default connectDB;