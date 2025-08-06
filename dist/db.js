var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/* RESP: CREATE AND INITIALIZE DATABASE */
import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    if (process.env.NODE_ENV === 'test')
        return;
    try {
        const { MONGO_DB_PASSWORD, MONGO_USERNAME, MONGO_APP_NAME } = process.env; // mongod db connection variables
        const url = `mongodb+srv://${MONGO_USERNAME}:${MONGO_DB_PASSWORD}@${MONGO_APP_NAME}.1w4ft.mongodb.net/?retryWrites=true&w=majority&appName=${MONGO_APP_NAME}`; // connection url
        yield mongoose.connect(url); // connect to mongodb
        console.log("Database Created");
    }
    catch (err) {
        console.error("MongoDB connection error:", err);
    }
});
export default connectDB;
