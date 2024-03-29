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
            console.error(err);
        }
    });
}

const RoomController = {
    allRooms,
    injectDB,
};

export default RoomController;