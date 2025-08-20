/* RESP: ONLY DEFINES ROUTES AND MIDDLEWARS */
import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";

/* routes*/
import authRoute from "./routes/auth.js";
import CustomError from "./utils/CustomError.js";

const app = express();

/* app level middleware */
// app.use(bodyParser.urlencoded({ extended: true })); // x-www-form-urlencoded <form>
app.use(bodyParser.json()); // allows body as json to be parsed to req parameter

/* app routes (router level middlewares)*/
app.use('/auth', authRoute); // authentication routes

// error handler: used to handle errors, which occur during request processing (app level middleware)
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.log("Error handler called");
  if (err instanceof CustomError) {
    console.log("Error message:", err.message);
    console.log("Error status:", err.statusCode);
    console.log("Error data:", err.data);

    const status = err.statusCode || 500;
    const message = err.message;
    const errors = err.data;

    return res.status(status).json({ message, errors });
  }

  return res.status(500).json({
    message: "Something went wrong"
  });
});

export default app;