import itemRouter from "./expressRouter.js";
import { create } from "./validation/item-validator.js";
itemRouter.post(`/create/:username`, create(), (req, res, next) => { console.log("here!"); });
export default itemRouter;
