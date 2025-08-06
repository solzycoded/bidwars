/* RESP: ONLY DEFINES ROUTES AND MIDDLEWARS */
import express from "express";

/* routes*/
// import authRoute from "./routes/auth.js";

const app = express(); 

/* app routes (router level middlewares)*/
// app.use('/auth', authRoute); // authentication routes

export default app;