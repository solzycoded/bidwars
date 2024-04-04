export default class Notification {
    constructor(db) {
        this.db = db;
    }

    create(data, callback){
        this.db.query('INSERT INTO Notifications (user_id, message) VALUES (?,?)', data, callback);
    }

    forUser(data, callback){
        const query = "SELECT id, message, un_read, created_at from Notifications WHERE user_id = ?";
        this.db.query(query, data, callback);
    }
}