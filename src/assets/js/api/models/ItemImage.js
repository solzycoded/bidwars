export default class ItemImage {
    constructor(db) {
      this.db = db;
    }

    create(data, callback) {
      this.db.query('INSERT INTO bidwars101.Item_Images (item_id, image_blob) VALUES (?, ?)', data, callback);
    }

    read(data, callback) {
      const query = "SELECT id, image_blob FROM bidwars101.Item_Images WHERE item_id = ? LIMIT 3";
      this.db.query(query, data, callback);
    }
} 