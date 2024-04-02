export default class Item {
    constructor(db) {
        this.db = db;
    }

    biddings(data, callback) {
        const query = "SELECT bidwars101.Bids.id, bidwars101.Bids.created_at, offer " +
        "FROM bidwars101.Bids " +
        `WHERE bidder = ? ` +
        `AND item_id = ? `
        "ORDER BY id";
        this.db.query(query, data, callback);
    }

    userItems(data, callback) {
        const query = "SELECT bidwars101.Items.id, title, price, bidwars101.Categories.name AS category, image_blob " +
            "FROM bidwars101.Items " +
            // "LEFT JOIN bidwars101.Auction_Rooms ON bidwars101.Items.id=bidwars101.Auction_Rooms.item_id " +
            "INNER JOIN bidwars101.Categories ON bidwars101.Categories.id=bidwars101.Items.category_id " +
            "INNER JOIN bidwars101.Item_Images ON bidwars101.Items.id=bidwars101.Item_Images.item_id " +
            `WHERE user_id = ? ` +
            "GROUP BY title ";
            "ORDER BY auction_date DESC";
        this.db.query(query, data, callback);
    }

    bidders(data, callback) {
        const query = "SELECT bidwars101.Bids.id AS id, bidwars101.Users.name, offer, bidwars101.Bids.created_at " +
            "FROM bidwars101.Items " +
            "INNER JOIN bidwars101.Bids ON bidwars101.Bids.item_id=bidwars101.Items.id " +
            "INNER JOIN bidwars101.Users ON bidwars101.Users.id=bidwars101.Items.user_id " +
            "WHERE item_id = ? " +
            "GROUP BY bidwars101.Bids.id " +
            "ORDER BY bidwars101.Bids.created_at";
        this.db.query(query, data, callback);
    }

    available(data, callback) {
        const query = "SELECT bidwars101.Items.id, title " +
            "FROM bidwars101.Items " +
            "LEFT JOIN bidwars101.Auction_Rooms ON bidwars101.Auction_Rooms.item_id=bidwars101.Items.id " +
            "WHERE Auction_Rooms.item_id IS NULL " +
            "GROUP BY bidwars101.Items.id";
        this.db.query(query, data, callback);
    }

    live(data, callback) {
        const query = "SELECT bidwars101.Items.id as id, title, image_blob as image, auction_date, auction_start, auction_end, COUNT(bidwars101.Bids.item_id) as bid_number " +
            "FROM bidwars101.Items " + 
            "LEFT JOIN bidwars101.Item_Images ON bidwars101.Items.id=bidwars101.Item_Images.item_id " +
            "INNER JOIN bidwars101.Auction_Rooms ON bidwars101.Items.id=bidwars101.Auction_Rooms.item_id " +
            "LEFT JOIN bidwars101.Bids ON bidwars101.Bids.item_id=bidwars101.Auction_Rooms.item_id " +
            "WHERE auction_date = CURDATE() " +
            "AND auction_end BETWEEN CURTIME() AND CURTIME() + INTERVAL 2 HOUR " +
            "GROUP BY title " +
            "ORDER BY bid_number DESC " + 
            "LIMIT 4";
        this.db.query(query, data, callback);
    }

    create(data, callback) {
        this.db.query('INSERT INTO bidwars101.Items (title, category_id, current_condition_id, price, selling_time, purchase_duration, time_frame_id, user_id, pre_condition_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', data, callback);
    }

    delete(data, callback) {
        const query = "DELETE FROM bidwars101.Items " + 
            "WHERE bidwars101.Items.id = ? " + 
            "AND user_id = ?";
        this.db.query(query, data, callback);
    }

    checkTitle(data, callback) {
        this.db.query('SELECT * FROM bidwars101.Items WHERE title = ?', data, callback);
    }

    findByName(data, callback){
        const query = this.findByQuery('title');
        this.db.query(query, data, callback);
    }

    findById(data, callback){
        const query = "SELECT bidwars101.Items.id, bidwars101.Items.user_id, title, price, auction_end, COUNT(bidwars101.Bids.item_id) as total_bids " +
            "FROM bidwars101.Items " +
            "INNER JOIN bidwars101.Auction_Rooms on bidwars101.Auction_Rooms.item_id=bidwars101.Items.id " +
            "INNER JOIN bidwars101.Bids on bidwars101.Bids.item_id=bidwars101.Items.id " +
            `WHERE bidwars101.Bids.item_id = ? ` +
            `GROUP BY bidwars101.Items.id`;
        this.db.query(query, data, callback);
    }

    findByQuery(column){
        return "SELECT bidwars101.Items.id AS id, bidwars101.Items.user_id as owner, title, price, bidwars101.Categories.name as category, purchase_duration, bidwars101.Time_Frames.name as time_frame, bidwars101.Item_Conditions.item_condition, bidwars101.Rooms.room_tag AS room, auction_end " +
            "FROM bidwars101.Items " +
            "INNER JOIN bidwars101.Categories on bidwars101.Categories.id=bidwars101.Items.category_id " +
            "INNER JOIN bidwars101.Time_Frames on bidwars101.Time_Frames.id=bidwars101.Items.time_frame_id " +
            "INNER JOIN bidwars101.Item_Conditions on bidwars101.Item_Conditions.id=bidwars101.Items.current_condition_id " +
            "INNER JOIN bidwars101.Auction_Rooms on bidwars101.Auction_Rooms.item_id=bidwars101.Items.id " +
            "INNER JOIN bidwars101.Rooms on bidwars101.Rooms.id=bidwars101.Auction_Rooms.room_id " +
            `WHERE bidwars101.Items.${column} = ?`;
    }
}