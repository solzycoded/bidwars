export default class User {
    constructor(db) {
      this.db = db;
    }

    all(callback) {
        this.db.query('SELECT * FROM bidwars101.Users', callback);
    }

    create(data, callback) {
        this.db.query('INSERT INTO bidwars101.Users (email, name, password, role, token) VALUES (?, ?, ?, ?, ?)', data, callback);
    }
}