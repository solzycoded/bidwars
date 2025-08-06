/* RESP: ACTUALLY STARTS THE SERVER AND DB CONNECTION. */
import app from "./app.js";
import connectDB from "./db.js";

/* start server and connect db */
if (process.env.NODE_ENV !== 'test') {
    connectDB().then(() => {
        const port: number = 3000;
        app.listen(port, () => {
            console.log('Server started on port: ', port);
        });
    });
}