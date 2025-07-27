// create and initialize database
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

async function connectDB(startServer) {
    try {
        const { MONGO_DB_PASSWORD, MONGO_USERNAME, MONGO_APP_NAME } = process.env;

        const url = `mongodb+srv://${MONGO_USERNAME}:${MONGO_DB_PASSWORD}@${MONGO_APP_NAME}.1w4ft.mongodb.net/?retryWrites=true&w=majority&appName=${MONGO_APP_NAME}`;

        const client = await MongoClient.connect(url, { serverSelectionTimeoutMS: 5000 }); // connect to mongodb and start it
        console.log("Database Created");

        startServer(); // start the nodejs server

        client.close(); // close the connection
    } catch (err) {
        console.error("MongoDB connection error:", err);
    }
}

export default connectDB;