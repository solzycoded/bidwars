/* RESP: ONLY DEFINES ROUTES AND MIDDLEWARS */
import express from "express";
import bodyParser from "body-parser";

/* routes*/
import authRoute from "./routes/auth.js";

const app = express();

/* app level middleware */
app.use(bodyParser.urlencoded({ extended: true })); // x-www-form-urlencoded <form>
app.use(bodyParser.json()); // allows body as json to be parsed to req parameter

/* app routes (router level middlewares)*/
app.use('/auth', authRoute); // authentication routes


export default app;