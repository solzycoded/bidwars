// controllers/timeFrameController.js
import TimeFrame from '../models/TimeFrame.js';

let db;
let timeFrame;

function injectDB(database) {
    db = database;

    timeFrame = new TimeFrame(db);
}

async function getTimeFrameList(req, res) {
    timeFrame.read(null, (err, result) => {
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

const TimeFrameController = {
    getTimeFrameList,
    injectDB,
};

export default TimeFrameController;