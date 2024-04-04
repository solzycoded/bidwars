export default class Category {
    constructor(db) {
        this.db = db;
    }

    items(data, callback){
        const query = "SELECT Items.id as id, title, price, name as category, image_blob " +
            "FROM Items " + 
            "INNER JOIN Categories ON Categories.id=Items.category_id " +
            "LEFT JOIN Item_Images ON Items.id=Item_Images.item_id " +
            "INNER JOIN Auction_Rooms ON Items.id=Auction_Rooms.item_id " +
            "WHERE auction_date = CURDATE() " +
            "AND auction_end BETWEEN CURTIME() AND CURTIME() + INTERVAL 2 HOUR " +
            `AND name LIKE '%${data[0]}' ` +
            "GROUP BY Items.id";
        this.db.query(query, data, callback);
    }

    read(data, callback){
        const query = "SELECT * FROM Categories";
        this.db.query(query, data, callback);
    }
}