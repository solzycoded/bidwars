export default class ItemImage {
    constructor(db) {
      this.db = db;
    }

    create(data, callback) {
        this.db.query('INSERT INTO bidwars101.Item_Images (item_id, image_text) VALUES (?, ?)', data, callback);
    }
}