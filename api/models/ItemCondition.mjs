export default class ItemCondition {
    constructor(db) {
        this.db = db;
    }

    read(data, callback){
        const query = "SELECT * FROM Item_Conditions " + 
            "WHERE pre_condition = ?";
        this.db.query(query, data, callback);
    }
}