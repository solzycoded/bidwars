// controllers/itemController.js
import Item from '../models/Item.js';

let db;
let item;

function injectDB(database) {
    db = database;

    item = new Item(db);
}

async function checkTitle(req, res) {
    const { title } = req.params;

    const data  = [title];

    item.checkTitle(data, (err, result) => {
        try{
            if(result.length > 0){
                res.status(201).json({ success: false, data: { message: "This title already exists. Kindly select something else." } });
            }
            else{
                res.status(201).json({ success: true });
            }
        } catch(err) {
            res.status(201).json({ success: false, data: { message: "Something went wrong!" } });
        }
    });
}

async function createItem(req, res) {
    const { title, category_id, item_condition, price, selling_time, purchase_duration, time_frame_id } = req.body;
    const { userId } = req.params;

    const data  = [title, category_id, item_condition, price, selling_time, purchase_duration, time_frame_id, userId];

    item.create(data, (err, result) => {
        try{
            if(result.insertId==undefined){
                res.status(201).json({ success: false, data: { message: "Title already exists! Please type something else." } });
            }
            else{
                res.status(201).json({ success: true, data: { id: result.insertId } });
            }
        } catch(err) {
            res.status(201).json({ success: false, data: { message: "Title already exists! Please type something else." } });
        }
    });
}

const ItemController = {
    createItem,
    injectDB,
    checkTitle
};

export default ItemController;