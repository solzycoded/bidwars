export default class Bid {
    constructor(db) {
        this.db = db;
    }

    // get the total number of bids for a specific item
    totalBids(data, callback){
        this.db.query('SELECT COUNT(bidwars101.Bids.item_id) as bids FROM bidwars101.Bids WHERE item_id = ?', data, callback);
    }

    create(data, callback){
        this.db.query('INSERT INTO bidwars101.Bids (bidder, item_id, offer) VALUES (?, ?, ?)', data, callback);
    }

    bidderItems(data, callback){
        const query = "SELECT bidwars101.Items.id, title " +
            "FROM bidwars101.Bids " + 
            "INNER JOIN bidwars101.Items ON bidwars101.Bids.item_id=bidwars101.Items.id " +
            "WHERE bidder = ? " +
            "GROUP BY bidwars101.Items.id;";

        this.db.query(query, data, callback);
    }
}