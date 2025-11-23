// RESP: ROUTES for the ItemController
import express from "express";
import { create } from "./validation/item-validator.js";
const itemRouter = express.Router();
itemRouter.post(`/create/:username`, create(), (req, res, next) => { console.log("here!"); });
export default itemRouter;
