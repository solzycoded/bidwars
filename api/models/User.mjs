export default class User {
    constructor(db) {
      this.db = db;
    }

    all(callback) {
        this.db.query('SELECT * FROM Users', callback);
    }

    create(data, callback) {
        this.db.query('INSERT INTO Users (email, name, password, role, token) VALUES (?, ?, ?, ?, ?)', data, callback);
    }

    login(data, callback){
        this.db.query('SELECT * FROM Users WHERE name = ?', data, callback);
    }

    createToken(data, callback){
        this.db.query('UPDATE Users SET token = ? WHERE id = ?', data, callback);
    }

    bidItems(data, callback){
        const query = "SELECT Items.id, title " +
            "FROM Bids " +
            "INNER JOIN Items ON Items.id=Bids.item_id " +
            `WHERE bidder = ? ` +
            "GROUP BY title " +
            "ORDER BY Bids.created_at";
        this.db.query(query, data, callback);
    }
}