// controllers/itemController.js
import Item from '../models/Item.js';
import { App } from "../util.js";

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
                res.status(201).json({ success: true, data: {message: ""} });
            }
        } catch(err) {
            res.status(201).json({ success: false, data: { message: "Something went wrong!" } });
        }
    });
}

async function createItem(req, res) {
    const { title, category_id, item_condition, price, selling_time, purchase_duration, time_frame_id, item_pre_condition } = req.body;
    const { userId } = req.params;

    const data  = [title, category_id, item_condition, price, selling_time, purchase_duration, time_frame_id, userId, item_pre_condition];

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

async function findByName(req, res) {
    const { title } = req.params;

    if(!title){
        return res.status(200).json({success: false, data: {message: "Title wasn't provided"}});
    }

    // building query
    const data = [title];

    item.findByName(data, (err, result) => {
        try{
            if(result!=undefined && result.length > 0){
                res.status(200).json({success: true, data: result[0]});
            }
            else{
                res.status(200).json({success: false, data: null});
            }
        } catch(err) {
            console.error(err);
        }
    });
}

async function findById(req, res) {
    const { id } = req.params;

    if(!id){
        return res.status(200).json({success: false, data: {message: "Id wasn't provided"}});
    }

    // building query
    const data = [id];

    item.findById(data, (err, result) => {
        try{
            if(result!=undefined && result.length > 0){
                res.status(200).json({success: true, data: result[0]});
            }
            else{
                res.status(200).json({success: false, data: {message: "Item does not exist"}});
            }
        } catch(err) {
            console.error(err);
        }
    });
}

async function liveAuctionItems(req, res){
    const app = new App();

    const data = [app.getTodaysDate(), app.getStartTime(), app.getEndTime()];

    item.live(data, (err, result) => {
        try{
            if(result.length > 0){
                res.status(200).json({success: true, data: result});
            }
            else{
                res.status(200).json({success: false, data: []});
            }
        } catch(err) {
            console.error(err);
        }
    });
}

async function availableItems(req, res){
    item.available(null, (err, result) => {
        try{
            if(result!=undefined && result.length > 0){
                res.status(200).json({success: true, data: result});
            }
            else{
                res.status(200).json({success: false, data: []});
            }
        } catch(err) {
            console.error(err);
        }
    });
}

async function deleteItem(req, res){
    const { itemId } = req.params;
    const { user_id, token } = req.body;

    if(!itemId || !user_id || !token){
        return res.status(201).json({success: false, data: {message: "Some fields are missing!"}});
    }

    const data = [itemId, user_id];

    item.delete(data, (err, result) => {
        try{
            if(result!=undefined && result.affectedRows >= 0){
                res.status(200).json({success: true, data: {message: "Your Item was successfully deleted!"}});
            }
            else{
                res.status(201).json({success: false, data: {message: "You're not authorized to perform this action"}});
            }
        } catch(err) {
            console.error(err);
        }
    });
}

async function getItemBidders(req, res) {
    const { itemId } = req.params;

    if(!itemId){
        return res.status(200).json({success: false, data: {message: "Item Id wasn't provided"}});
    }

    // building query
    const data = [itemId];

    item.bidders(data, (err, result) => {
        try{
            if(result!=undefined && result.length > 0){
                res.status(200).json({success: true, data: result});
            }
            else{
                res.status(200).json({success: false, data: []});
            }
        } catch(err) {
            console.error(err);
        }
    });
}

async function allUserItems(req, res) {
    const { userId } = req.params;

    if(!userId){
        return res.status(200).json({success: false, data: {message: "Item Id wasn't provided"}});
    }

    // building query
    const data = [userId];

    item.userItems(data, (err, result) => {
        try{
            if(result!=undefined && result.length > 0){
                res.status(200).json({success: true, data: result});
            }
            else{
                res.status(200).json({success: false, data: []});
            }
        } catch(err) {
            console.error(err);
        }
    });
}

const ItemController = {
    allUserItems,
    createItem,
    injectDB,
    checkTitle,
    findByName,
    liveAuctionItems,
    findById,
    availableItems,
    deleteItem,
    getItemBidders
};

export default ItemController;
