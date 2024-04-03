export default class Notification {
    constructor(db) {
        this.db = db;
    }

    create(data, callback){
        this.db.query('INSERT INTO bidwars101.Notifications (user_id, message) VALUES (?,?)', data, callback);
    }

    forUser(data, callback){
        const query = "SELECT id, message, un_read, created_at from bidwars101.Notifications WHERE user_id = ?";
        this.db.query(query, data, callback);
    }
}