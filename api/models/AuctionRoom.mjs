export default class AuctionRoom {
    constructor(db) {
        this.db = db;
    }

    delete(data, callback) {
        this.db.query(`DELETE FROM Auction_Rooms WHERE id = ?;`, data, callback);
    }

    create(data, callback) {
        this.db.query(`INSERT IGNORE INTO Auction_Rooms (room_id, item_id, auction_date, auction_start, auction_end) VALUES ${data.columns}`, data.data, callback);
    }

    allDates(data, callback) {
        const query = "SELECT DISTINCT DATE_FORMAT(auction_date, '%Y-%m-%d') AS auction_date " +
            "FROM Auction_Rooms " +
            "WHERE auction_date >= ? "
            "GROUP BY auction_date " +
            "ORDER BY MONTH(auction_date), DAY(auction_date) ASC";

        this.db.query(query, data, callback);
    }

    allStartTimes(data, callback) {
        const query = "SELECT DISTINCT auction_start " +
            "FROM Auction_Rooms " +
            "WHERE auction_date >= ? "
            "GROUP BY auction_start " +
            "ORDER BY auction_start ASC";

        this.db.query(query, data, callback);
    }

    allItems(data, callback) {
        const query = this.itemsQuery();
        this.db.query(query, data, callback);
    }

    filteredItems(data, callback) {
        const query = this.itemsQuery(data);
        this.db.query(query, data, callback);
    }

    itemsQuery(data = null){
        const query = "SELECT Auction_Rooms.id as auction_room_id, title, Categories.name as category, DATE_FORMAT(auction_date, '%Y-%m-%d') AS auction_date, TIME_FORMAT(auction_start, '%h:%i %p') AS auction_start, TIME_FORMAT(auction_end, '%h:%i %p') AS auction_end " +
            "FROM Auction_Rooms " +
            "INNER JOIN Items ON Items.id=Auction_Rooms.item_id " +
            "INNER JOIN Categories ON Items.category_id=Categories.id " +
            (data!==null ? this.filterConditions(data) : "") +
            "GROUP BY title " +
            "ORDER BY title ASC";
        
        return query;
    }

    filterConditions(data){
        let conditions = "";

        if(data[0]!=="" || data[1]!=="" || data[2]!==""){
            conditions = "WHERE";
        }
        else{
            return "";
        }

        if(data[0]!=""){
            conditions += ` auction_date = '${data[0]}' `;
        }
        if(data[0]!="" && data[1]!=""){
            conditions +="AND";
        }
        if(data[1]!=""){
            conditions += ` auction_start = '${data[1]}' `;
        }
        if(data[1]!="" && data[2]!=""){
            conditions +="AND";
        }
        else if(data[0]!="" && data[2]!=""){
            conditions +="AND";
        }
        if(data[2]!=""){
            conditions += ` room_id = ${data[2]} `;
        }

        return conditions;
    }
}