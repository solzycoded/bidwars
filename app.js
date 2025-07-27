import express from "express";
import connectDB from "./db.js";

const app = express();

const startServer = () => {
    const port = 3000;
    app.listen(port, () => {
        console.log("App started on port: ", port);
    });
}

connectDB(startServer); // connect to mongodb and start the nodejs server