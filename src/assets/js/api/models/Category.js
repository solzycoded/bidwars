export default class Category {
    constructor(db) {
        this.db = db;
    }

    items(data, callback){
        const query = "SELECT bidwars101.Items.id as id, title, price, name as category, image_blob " +
            "FROM bidwars101.Items " + 
            "INNER JOIN bidwars101.Categories ON bidwars101.Categories.id=bidwars101.Items.category_id " +
            "LEFT JOIN bidwars101.Item_Images ON bidwars101.Items.id=bidwars101.Item_Images.item_id " +
            "INNER JOIN bidwars101.Auction_Rooms ON bidwars101.Items.id=bidwars101.Auction_Rooms.item_id " +
            "WHERE auction_date = CURDATE() " +
            "AND auction_end BETWEEN CURTIME() AND CURTIME() + INTERVAL 2 HOUR " +
            `AND name LIKE '%${data[0]}' ` +
            "GROUP BY bidwars101.Items.id";
        this.db.query(query, data, callback);
    }

    read(data, callback){
        const query = "SELECT * FROM bidwars101.Categories";
        this.db.query(query, data, callback);
    }
}