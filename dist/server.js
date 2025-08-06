"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* RESP: ACTUALLY STARTS THE SERVER AND DB CONNECTION. */
const app_js_1 = __importDefault(require("./app.js"));
const db_js_1 = __importDefault(require("./db.js"));
/* start server and connect db */
if (process.env.NODE_ENV !== 'test') {
    (0, db_js_1.default)().then(() => {
        const port = 3000;
        app_js_1.default.listen(port, () => {
            console.log('Server started on port: ', port);
        });
    });
}
