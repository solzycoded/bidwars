// controllers/auctionRoomController.js
import AuctionRoom from '../models/AuctionRoom.js';
import { App } from "../util.js";

let db;
let auctionRoom;

function injectDB(database) {
    db = database;

    auctionRoom = new AuctionRoom(db);
}

async function allAuctionDates(req, res) {
    const app = new App();

    const data = [app.getTodaysDate()];

    auctionRoom.allDates(data, (err, result) => {
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

async function allStartTimes(req, res) {
    const app = new App();

    const data = [app.getTodaysDate()];

    auctionRoom.allStartTimes(data, (err, result) => {
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

async function allAuctionItems(req, res) {
    auctionRoom.allItems(null, (err, result) => {
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

async function deleteAuctionItem(req, res) {
    const { id } = req.params;

    if(!id){
        return res.status(200).json({success: false, data: {message: "Id must be set"}});
    }

    const data = [id];

    auctionRoom.delete(data, (err, result) => {
        try{
            if(result!=undefined && result.affectedRows >= 1){
                res.status(200).json({success: true, data: {message: "Item was successfully removed from auction room!"}});
            }
            else{
                return res.status(200).json({success: false, data: {message: "Record does not exist!"}});
            }
        } catch(err) {
            console.error(err);
        }
    });
}

async function filteredItems(req, res) {
    let {room_id, date, time} = req.body;

    let data = [date, time, room_id];

    auctionRoom.filteredItems(data, (err, result) => {
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

async function createAuction(req, res) {
    const { room_id, items, auction_date, auction_start, auction_end } = req.body;

    if(!room_id || !items || !auction_date || !auction_start || !auction_end){
        res.status(200).json({success: false, data: {message: "All fields must be filled!"}});
    }

    let data = auctionRoomValues({room_id, items, auction_date, auction_start, auction_end});

    auctionRoom.create(data, (err, result) => {
        try{
            if(result!=undefined && result.insertId){
                res.status(200).json({success: true, data: {message: "Auction was successfully scheduled!"}});
            }
            else{
                res.status(200).json({success: false, data: {message: "Auction wasn't successfully scheduled"}});
            }
        } catch(err) {
            console.error(err);
        }
    });
}

function auctionRoomValues(data){
    let auctionRoomData = [];
    let columns         = "";
    let items           = data.items;

    for (let index = 0; index < items.length; index++) {
        auctionRoomData.push(data.room_id);
        auctionRoomData.push(items[index]);
        auctionRoomData.push(data.auction_date);
        auctionRoomData.push(data.auction_start);
        auctionRoomData.push(data.auction_end);

        columns += "(?,?,?,?,?)";

        if(index < items.length - 1){
            columns += ", ";
        }
    }

    return {data: auctionRoomData, columns};
}

const AuctionRoomController = {
    createAuction,
    injectDB,
    allAuctionDates,
    allStartTimes,
    allAuctionItems,
    filteredItems,
    deleteAuctionItem,
};

export default AuctionRoomController;