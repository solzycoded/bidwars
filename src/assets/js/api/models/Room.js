export default class Room {
    constructor(db) {
        this.db = db;
    }

    all(data, callback) {
        this.db.query('SELECT * FROM bidwars101.Rooms', data, callback);
    }
}