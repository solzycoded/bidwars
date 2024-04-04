export default class Item {
    constructor(db) {
        this.db = db;
    }

    search(data, callback) {
        const query = "SELECT Items.id, title " +
            "FROM Items " +
            "INNER JOIN Categories ON Categories.id=Items.category_id " + 
            `WHERE ${data.filter} title LIKE ?`;
        this.db.query(query, data.data, callback);
    }

    biddings(data, callback) {
        const query = "SELECT Bids.id, Bids.created_at, offer " +
        "FROM Bids " +
        `WHERE bidder = ? ` +
        `AND item_id = ? `
        "ORDER BY id";
        this.db.query(query, data, callback);
    }
 
    userItems(data, callback) {
        const query = "SELECT Items.id, title, price, Categories.name AS category, image_blob " +
            "FROM Items " +
            "INNER JOIN Categories ON Categories.id=Items.category_id " +
            "INNER JOIN Item_Images ON Items.id=Item_Images.item_id " +
            `WHERE user_id = ? ` +
            "GROUP BY title ";
            "ORDER BY auction_date DESC";
        this.db.query(query, data, callback);
    }

    bidders(data, callback) {
        const query = "SELECT Bids.id AS id, Users.name, offer, Bids.created_at " +
            "FROM Items " +
            "INNER JOIN Bids ON Bids.item_id=Items.id " +
            "INNER JOIN Users ON Users.id=Items.user_id " +
            "WHERE item_id = ? " +
            "GROUP BY Bids.id " +
            "ORDER BY Bids.created_at";
        this.db.query(query, data, callback);
    }

    available(data, callback) {
        const query = "SELECT Items.id, title " +
            "FROM Items " +
            "LEFT JOIN Auction_Rooms ON Auction_Rooms.item_id=Items.id " +
            "WHERE Auction_Rooms.item_id IS NULL " +
            "GROUP BY Items.id";
        this.db.query(query, data, callback);
    }

    live(data, callback) {
        const query = "SELECT Items.id as id, title, image_blob as image, auction_date, auction_start, auction_end, COUNT(Bids.item_id) as bid_number " +
            "FROM Items " + 
            "LEFT JOIN Item_Images ON Items.id=Item_Images.item_id " +
            "INNER JOIN Auction_Rooms ON Items.id=Auction_Rooms.item_id " +
            "LEFT JOIN Bids ON Bids.item_id=Auction_Rooms.item_id " +
            "WHERE auction_date = CURDATE() " +
            "AND auction_end BETWEEN CURTIME() AND CURTIME() + INTERVAL 2 HOUR " +
            "GROUP BY title " +
            "ORDER BY bid_number DESC " + 
            "LIMIT 4";
        this.db.query(query, data, callback);
    }

    create(data, callback) {
        this.db.query('INSERT INTO Items (title, category_id, current_condition_id, price, selling_time, purchase_duration, time_frame_id, user_id, pre_condition_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', data, callback);
    }

    delete(data, callback) {
        const query = "DELETE FROM Items " + 
            "WHERE Items.id = ? " + 
            "AND user_id = ?";
        this.db.query(query, data, callback);
    }

    checkTitle(data, callback) {
        this.db.query('SELECT * FROM Items WHERE title = ?', data, callback);
    }

    findByName(data, callback){
        const query = this.findByQuery('title');
        this.db.query(query, data, callback);
    }

    findById(data, callback){
        const query = "SELECT Items.id, Items.user_id, title, price, auction_end, COUNT(Bids.item_id) as total_bids " +
            "FROM Items " +
            "INNER JOIN Auction_Rooms on Auction_Rooms.item_id=Items.id " +
            "LEFT JOIN Bids on Bids.item_id=Items.id " +
            `WHERE Auction_Rooms.item_id = ? ` +
            `GROUP BY Items.id`;
        this.db.query(query, data, callback);
    }

    findByQuery(column){
        return "SELECT Items.id AS id, Items.user_id as owner, title, price, Categories.name as category, purchase_duration, Time_Frames.name as time_frame, Item_Conditions.item_condition, Rooms.room_tag AS room, auction_end " +
            "FROM Items " +
            "INNER JOIN Categories on Categories.id=Items.category_id " +
            "INNER JOIN Time_Frames on Time_Frames.id=Items.time_frame_id " +
            "INNER JOIN Item_Conditions on Item_Conditions.id=Items.current_condition_id " +
            "INNER JOIN Auction_Rooms on Auction_Rooms.item_id=Items.id " +
            "INNER JOIN Rooms on Rooms.id=Auction_Rooms.room_id " +
            `WHERE Items.${column} = ?`;
    }
}