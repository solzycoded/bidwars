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

    login(data, callback){
        this.db.query('SELECT * FROM bidwars101.Users WHERE name = ?', data, callback);
    }

    createToken(data, callback){
        this.db.query('UPDATE bidwars101.Users SET token = ? WHERE id = ?', data, callback);
    }
 
    bidItems(data, callback){
        const query = "SELECT bidwars101.Items.id, title " +
            "FROM bidwars101.Bids " +
            "INNER JOIN bidwars101.Items ON bidwars101.Items.id=bidwars101.Bids.item_id " +
            `WHERE bidder = ? ` +
            "GROUP BY title " +
            "ORDER BY bidwars101.Bids.created_at";
        this.db.query(query, data, callback);
    }
}