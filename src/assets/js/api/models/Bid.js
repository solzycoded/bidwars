export default class Bid {
    constructor(db) {
        this.db = db;
    }

    // get the total number of bids for a specific item
    totalBids(data, callback){
        this.db.query('SELECT COUNT(bidwars101.Bids.item_id) as bids FROM bidwars101.Bids WHERE item_id = ?', data, callback);
    }

    create(data, callback){
        this.db.query('INSERT INTO FROM bidwars101.Bids (bidder, item_id, offer) VALUES (?, ?, ?)', data, callback);
    }
}