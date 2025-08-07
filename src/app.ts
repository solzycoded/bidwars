/* RESP: ONLY DEFINES ROUTES AND MIDDLEWARS */
import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";

/* routes*/
import authRoute from "./routes/auth.js";
import CustomError from "./utils/CustomError.js";

const app = express();

/* app level middleware */
app.use(bodyParser.urlencoded({ extended: true })); // x-www-form-urlencoded <form>
app.use(bodyParser.json()); // allows body as json to be parsed to req parameter

/* app routes (router level middlewares)*/
app.use('/auth', authRoute); // authentication routes

// error handler: used to handle errors, which occur during request processing (app level middleware)
app.use((error: CustomError, req: Request, res: Response, next: NextFunction): void => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;

  res.status(status).json({ message: message, data: data });
});

export default app;