export default class Bid {
    constructor(db) {
        this.db = db;
    }

    totalBids(data, callback){
        this.db.query('SELECT COUNT(Bids.item_id) as bids FROM Bids WHERE item_id = ?', data, callback);
    }

    create(data, callback){
        this.db.query('INSERT INTO Bids (bidder, item_id, offer) VALUES (?, ?, ?)', data, callback);
    }
  
    bidderItems(data, callback){
        const query = "SELECT Items.id, title " +
            "FROM Bids " + 
            "INNER JOIN Items ON Bids.item_id=Items.id " +
            "WHERE bidder = ? " +
            "GROUP BY Items.id;";

        this.db.query(query, data, callback);
    }
}