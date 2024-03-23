export default class Item {
    constructor(db) {
      this.db = db;
    }

    create(data, callback) {
        this.db.query('INSERT INTO bidwars101.Items (title, category_id, item_condition_id, price, selling_time, purchase_duration, time_frame_id, user_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', data, callback);
    }

    checkTitle(data, callback) {
        this.db.query('SELECT * FROM bidwars101.Items WHERE title = ?', data, callback);
    }
}