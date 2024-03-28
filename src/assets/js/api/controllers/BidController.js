// controllers/bidController.js
import Bid from '../models/Bid.js';

let db;
let bid;

function injectDB(database) {
    db = database;

    bid = new Bid(db);
}

async function getTotalBids(req, res) {
    const { itemId }    = req.params;

    // validation
    if(!itemId){
        throw new Error("There are missing fields!");
    }

    const data = [itemId];

    bid.totalBids(data, (err, result) => {
        try{
            if(result.length > 0){
                res.status(200).json({success: true, data: result[0]});
            }
            else{
                res.status(200).json({success: false, data: { bids: 0 }});
            }
        } catch(err) {
            console.error(err);
        }
    });
}

async function createBid(req, res) {
    const { bidder, item_id, offer }    = req.body;

    // validation
    if(!bidder || !item_id || !offer){
        throw new Error("There are missing fields!");
    }

    const data = [bidder, item_id, offer];

    bid.create(data, (err, result) => {
        try{
            if(result==undefined){
                res.status(201).json({success: false, data: {message: "Your bid has not been received! Something went wrong."}});
            }
            else{
                res.status(200).json({success: true, data: {message: "Your bid has been received!"}});
            }
        } catch(err) {
            console.error(err);
        }
    });
}

const BidController = {
    getTotalBids,
    createBid,
    injectDB,
};

export default BidController;