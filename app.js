import express from "express";
import { MongoClient } from "mongodb";

const app = express();

const url = "";
MongoClient.connect()
const port = 3000;
app.listen(port, () => {
    console.log("App started on port: ", port);
});