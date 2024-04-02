// controllers/roomController.js
import Room from '../models/Room.js';

let db;
let room;

function injectDB(database) {
    db = database;

    room = new Room(db);
}

async function allRooms(req, res) {
    room.all(null, (err, result) => {
        try{
            if(result.length > 0){
                res.status(200).json({success: true, data: result});
            }
            else{
                res.status(200).json({success: false, data: null});
            }
        } catch(err) {
            return res.status(500).json({ success: false, data: {message: "Something went wrong!", error: err }});
        }
    });
}

async function itemsInARoom(req, res) {
    const {roomId} = req.params;

    if(!roomId){
        return res.status(200).json({success: false, data: {message: "Room id is missing!"}});
    }

    let data = [roomId];

    room.items(data, (err, result) => {
        try{
            if(result!=undefined && result.length > 0){
                res.status(200).json({success: true, data: result});
            }
            else{
                res.status(200).json({success: false, data: []});
            }
        } catch(err) {
            return res.status(500).json({ success: false, data: {message: "Something went wrong!", error: err }});
        }
    });
}

async function getLiveRooms(req, res) {
    room.live(null, (err, result) => {
        try{
            if(result!=undefined && result.length > 0){
                res.status(200).json({success: true, data: result});
            }
            else{
                res.status(200).json({success: false, data: []});
            }
        } catch(err) {
            return res.status(500).json({ success: false, data: {message: "Something went wrong!", error: err }});
        }
    });
}

async function getImagesInARoom(req, res) {
    const {roomId} = req.params;

    if(!roomId){
        return res.status(200).json({success: false, data: {message: "Room id is missing!"}});
    }

    let data  = [roomId];

    room.images(data, (err, result) => {
        try{
            if(result.length > 0){
                res.status(200).json({success: true, data: result});
            }
            else{
                res.status(201).json({success: false, data: []});
            }
        } catch(err) {
            return res.status(500).json({ success: false, data: {message: "Something went wrong!", error: err }});
        }
    });
}

async function totalBidsInARoom(req, res) {
    const {roomId} = req.params;

    if(!roomId){
        return res.status(406).json({success: false, data: {message: "Room id is missing!"}});
    }

    let data  = [roomId];

    room.bids(data, (err, result) => {
        try{
            if(result.length > 0){
                res.status(200).json({success: true, data: result[0]});
            }
            else{
                res.status(201).json({success: false, data: { bids: 0}});
            }
        } catch(err) {
            return res.status(500).json({ success: false, data: {message: "Something went wrong!", error: err }});
        }
    });
}

async function categoriesInARoom(req, res) {
    const {roomId} = req.params;

    if(!roomId){
        return res.status(406).json({success: false, data: {message: "Room id is missing!"}});
    }

    let data  = [roomId];

    room.categories(data, (err, result) => {
        try{
            if(result!=undefined && result.length > 0){
                res.status(200).json({success: true, data: result});
            }
            else{
                res.status(201).json({success: false, data: []});
            }
        } catch(err) {
            return res.status(500).json({ success: false, data: {message: "Something went wrong!", error: err }});
        }
    });
}

async function allItemsInARoom(req, res) {
    const {roomId} = req.params;

    if(!roomId){
        return res.status(406).json({success: false, data: {message: "Room id is missing!"}});
    }

    let data = [roomId];

    room.allItems(data, (err, result) => {
        try{
            if(result!=undefined && result.length > 0){
                res.status(200).json({success: true, data: result});
            }
            else{
                res.status(201).json({success: false, data: []});
            }
        } catch(err) {
            return res.status(500).json({ success: false, data: {message: "Something went wrong!", error: err }});
        }
    });
}

async function findRoom(req, res) {
    const {roomName} = req.params;

    if(!roomName){
        return res.status(406).json({success: false, data: {message: "Room name is missing!"}});
    }

    let data = [roomName];

    room.find(data, (err, result) => {
        try{
            if(result!=undefined && result.length > 0){
                res.status(200).json({success: true, data: result[0]});
            }
            else{
                res.status(201).json({success: false, data: null});
            }
        } catch(err) {
            return res.status(500).json({ success: false, data: {message: "Something went wrong!", error: err }});
        }
    });
}

const RoomController = {
    findRoom,
    allRooms,
    injectDB,
    itemsInARoom,
    getLiveRooms,
    getImagesInARoom,
    categoriesInARoom,
    totalBidsInARoom,
    allItemsInARoom
};

export default RoomController;