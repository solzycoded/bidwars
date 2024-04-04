export default class ItemImage {
    constructor(db) {
      this.db = db;
    }

    create(data, callback) {
      this.db.query('INSERT INTO Item_Images (item_id, image_blob) VALUES (?, ?)', data, callback);
    }

    read(data, callback) {
      const query = "SELECT id, image_blob FROM Item_Images WHERE item_id = ? LIMIT 3";
      this.db.query(query, data, callback);
    }
} 