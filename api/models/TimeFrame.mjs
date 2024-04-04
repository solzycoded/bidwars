export default class Bid {
    constructor(db) {
        this.db = db;
    }

    read(data, callback){
        const query = "SELECT * FROM Time_Frames";
        this.db.query(query, data, callback);
    }
}