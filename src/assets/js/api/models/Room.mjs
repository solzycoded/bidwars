export default class Room {
    constructor(db) {
        this.db = db;
    }

    all(data, callback) {
        this.db.query('SELECT * FROM Rooms', data, callback);
    }

    items(data, callback) {
        const query = "SELECT Items.id, title " +
            "FROM Auction_Rooms " +
            "INNER JOIN Items ON Items.id=Auction_Rooms.item_id " +
            "WHERE auction_date = CURDATE() " +
            "AND auction_end BETWEEN CURTIME() AND CURTIME() + INTERVAL 2 HOUR " +
            "AND room_id = ? " +
            "GROUP BY title "
            "LIMIT 5";
        this.db.query(query, data, callback);
    }

    live(data, callback) {
        const query = "SELECT Rooms.id, Rooms.room_tag AS room " +
            "FROM Rooms " + 
            "INNER JOIN Auction_Rooms ar ON ar.room_id=Rooms.id " +
            "WHERE auction_date = CURDATE() " +
            "AND auction_end BETWEEN CURTIME() AND CURTIME() + INTERVAL 2 HOUR " +
            "GROUP BY room_tag";
        this.db.query(query, data, callback);
    }

    images(data, callback){
        const query = "SELECT DISTINCT Auction_Rooms.item_id, image_blob " +
            "FROM Auction_Rooms " +
            "INNER JOIN Item_Images ON Item_Images.item_id=Auction_Rooms.item_id " +
            `WHERE Auction_Rooms.room_id = ? ` +
            "AND auction_date = CURDATE() " +
            "AND auction_end BETWEEN CURTIME() AND CURTIME() + INTERVAL 2 HOUR " +
            "GROUP BY Auction_Rooms.item_id " +
            "LIMIT 3";
        this.db.query(query, data, callback);
    }

    bids(data, callback){
        const query = "SELECT DISTINCT COUNT(Bids.item_id) as bids " +
            "FROM Auction_Rooms " +
            "INNER JOIN Bids ON Bids.item_id=Auction_Rooms.item_id " +
            "WHERE auction_date = CURDATE() " +
            "AND auction_end BETWEEN CURTIME() AND CURTIME() + INTERVAL 2 HOUR " +
            `AND room_id = ? `;
        this.db.query(query, data, callback);
    }

    categories(data, callback){
        const query = "SELECT Categories.id, name " +
            "FROM Categories " +
            "INNER JOIN Items ON Items.category_id=Categories.id " +
            "INNER JOIN Auction_Rooms ON Items.id=Auction_Rooms.item_id " +
            "WHERE auction_date = CURDATE() " +
            "AND auction_end BETWEEN CURTIME() AND CURTIME() + INTERVAL 2 HOUR " +
            `AND room_id = ? ` +
            "GROUP BY Categories.id";
        this.db.query(query, data, callback);
    }

    allItems(data, callback){
        const query = "SELECT Items.id, title, price, Categories.name AS category, image_blob " +
            "FROM Items " +
            "LEFT JOIN Auction_Rooms ON Items.id=Auction_Rooms.item_id " +
            "INNER JOIN Categories ON Categories.id=Items.category_id " +
            "LEFT JOIN Item_Images ON Items.id=Item_Images.item_id " +
            "WHERE auction_date = CURDATE() " +
            "AND auction_end BETWEEN CURTIME() AND CURTIME() + INTERVAL 2 HOUR " +
            `AND room_id = ? ` +
            "GROUP BY title";
        this.db.query(query, data, callback);
    }

    find(data, callback){
        const query = "SELECT Rooms.id, COUNT(Bids.bidder) AS bidders, auction_end " +
            "FROM Auction_Rooms " +
            "INNER JOIN Rooms ON Rooms.id=Auction_Rooms.room_id " +
            "LEFT JOIN Bids ON Bids.item_id=Auction_Rooms.item_id " +
            "WHERE auction_date = CURDATE() " +
            "AND auction_end BETWEEN CURTIME() AND CURTIME() + INTERVAL 2 HOUR " +
            `AND Rooms.room_tag = ? ` +
            "GROUP BY Rooms.id";
            // "ORDER BY auction_end ASC";
        this.db.query(query, data, callback);
    }
}