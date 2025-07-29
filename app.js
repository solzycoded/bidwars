import express from "express";
import connectDB from "./db.js";

/* routes*/
import authRoute from "./routes/auth.js";

const app = express(); 

/* app routes (router level middlewares)*/
app.use('/auth', authRoute); // authentication routes

/* start server and connect db */
const startServer = () => {
    const port = 3000;
    app.listen(port, () => {
        console.log("App started on port: ", port);
    });
}

connectDB(startServer); // connect to mongodb and start the nodejs server