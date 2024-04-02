export default class Room {
    constructor(db) {
        this.db = db;
    }

    all(data, callback) {
        this.db.query('SELECT * FROM bidwars101.Rooms', data, callback);
    }

    items(data, callback) {
        const query = "SELECT bidwars101.Items.id, title " +
            "FROM bidwars101.Auction_Rooms " +
            "INNER JOIN bidwars101.Items ON bidwars101.Items.id=bidwars101.Auction_Rooms.item_id " +
            "WHERE auction_date = CURDATE() " +
            "AND auction_end BETWEEN CURTIME() AND CURTIME() + INTERVAL 2 HOUR " +
            "AND room_id = ? " +
            "GROUP BY title "
            "LIMIT 5";
        this.db.query(query, data, callback);
    }

    live(data, callback) {
        const query = "SELECT bidwars101.Rooms.id, bidwars101.Rooms.room_tag AS room " +
            "FROM bidwars101.Rooms " + 
            "INNER JOIN bidwars101.Auction_Rooms ar ON ar.room_id=bidwars101.Rooms.id " +
            "WHERE auction_date = CURDATE() " +
            "AND auction_end BETWEEN CURTIME() AND CURTIME() + INTERVAL 2 HOUR " +
            "GROUP BY room_tag";
        this.db.query(query, data, callback);
    }

    images(data, callback){
        const query = "SELECT DISTINCT bidwars101.Auction_Rooms.item_id, image_blob " +
            "FROM bidwars101.Auction_Rooms " +
            "INNER JOIN bidwars101.Item_Images ON bidwars101.Item_Images.item_id=bidwars101.Auction_Rooms.item_id " +
            `WHERE bidwars101.Auction_Rooms.room_id = ? ` +
            "AND auction_date = CURDATE() " +
            "AND auction_end BETWEEN CURTIME() AND CURTIME() + INTERVAL 2 HOUR " +
            "GROUP BY bidwars101.Auction_Rooms.item_id " +
            "LIMIT 3";
        this.db.query(query, data, callback);
    }

    bids(data, callback){
        const query = "SELECT DISTINCT COUNT(bidwars101.Bids.item_id) as bids " +
            "FROM bidwars101.Auction_Rooms " +
            "INNER JOIN bidwars101.Bids ON bidwars101.Bids.item_id=bidwars101.Auction_Rooms.item_id " +
            "WHERE auction_date = CURDATE() " +
            "AND auction_end BETWEEN CURTIME() AND CURTIME() + INTERVAL 2 HOUR " +
            `AND room_id = ? `;
        this.db.query(query, data, callback);
    }

    categories(data, callback){
        const query = "SELECT bidwars101.Categories.id, name " +
            "FROM bidwars101.Categories " +
            "INNER JOIN bidwars101.Items ON bidwars101.Items.category_id=bidwars101.Categories.id " +
            "INNER JOIN bidwars101.Auction_Rooms ON bidwars101.Items.id=bidwars101.Auction_Rooms.item_id " +
            "WHERE auction_date = CURDATE() " +
            "AND auction_end BETWEEN CURTIME() AND CURTIME() + INTERVAL 2 HOUR " +
            `AND room_id = ? ` +
            "GROUP BY bidwars101.Categories.id";
        this.db.query(query, data, callback);
    }

    allItems(data, callback){
        const query = "SELECT bidwars101.Items.id, title, price, bidwars101.Categories.name AS category, image_blob " +
            "FROM bidwars101.Items " +
            "LEFT JOIN bidwars101.Auction_Rooms ON bidwars101.Items.id=bidwars101.Auction_Rooms.item_id " +
            "INNER JOIN bidwars101.Categories ON bidwars101.Categories.id=bidwars101.Items.category_id " +
            "LEFT JOIN bidwars101.Item_Images ON bidwars101.Items.id=bidwars101.Item_Images.item_id " +
            "WHERE auction_date = CURDATE() " +
            "AND auction_end BETWEEN CURTIME() AND CURTIME() + INTERVAL 2 HOUR " +
            `AND room_id = ? ` +
            "GROUP BY title";
        this.db.query(query, data, callback);
    }

    find(data, callback){
        const query = "SELECT DISTINCT bidwars101.Rooms.id, COUNT(bidwars101.Bids.bidder) AS bidders, auction_end " +
            "FROM bidwars101.Auction_Rooms " +
            "INNER JOIN bidwars101.Rooms ON bidwars101.Rooms.id=bidwars101.Auction_Rooms.room_id " +
            "INNER JOIN bidwars101.Bids ON bidwars101.Bids.item_id=bidwars101.Auction_Rooms.item_id " +
            "WHERE auction_date = CURDATE() " +
            "AND auction_end BETWEEN CURTIME() AND CURTIME() + INTERVAL 2 HOUR " +
            `AND bidwars101.Rooms.room_tag = ? ` +
            "GROUP BY bidwars101.Rooms.id ";
            "ORDER BY auction_end ASC";
        this.db.query(query, data, callback);
    }
}