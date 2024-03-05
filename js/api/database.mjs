import mysql from "mysql";

export class Db {
    static con() {
        let con = mysql.createConnection({
            host: "localhost",
            user: "bidwars_admin",
            password: "anadmintobidwars101ishere"
        });

        return con;
    }

    static sendQuery(query, con){
        con.query(query, 
            function (err, result) {
                if (err) throw err;
                // else {
                //     console.log("Created");
                // }
            }
        );
    }

    static createDb(con) {
        con.connect(function(err) {
            if (err) throw err;
            console.log("Connected!");

            Db.sendQuery("DROP DATABASE IF EXISTS bidwars101", con);
            Db.sendQuery("CREATE DATABASE IF NOT EXISTS bidwars101", con);
            Db.createTables(con);
            Db.insertDefaultData(con);
        });
    }

    static queryPromise(con, SQL, values = []) {
        return new Promise((resolve, reject) => {
            con.query(SQL, values, (error, results) => {
                if(error) {
                    reject(error);
                }
                else {
                    resolve(results);
                }
            });
        });
    }

    static createTables(con) {
        // table queries
        let table = {
            categories: "CREATE TABLE IF NOT EXISTS bidwars101.Categories (" +
                        "id INT NOT NULL PRIMARY KEY AUTO_INCREMENT," +
                        "name VARCHAR(20) NOT NULL UNIQUE" +
                    ");",
            users: "CREATE TABLE IF NOT EXISTS bidwars101.Users (" +
                        "id INT NOT NULL PRIMARY KEY AUTO_INCREMENT," +
                        "name VARCHAR(50) NOT NULL UNIQUE," +
                        "email VARCHAR(120) NOT NULL UNIQUE," +
                        "password VARCHAR(30) NOT NULL," +
                        "created_at DATETIME DEFAULT NOW()" +
                    ");",
            notifications: "CREATE TABLE IF NOT EXISTS bidwars101.Notifications (" +
                            "id INT NOT NULL PRIMARY KEY AUTO_INCREMENT," +
                            "user_id INT NOT NULL," +
                            "message TEXT NOT NULL," +
                            "created_at DATETIME DEFAULT NOW()," +
                            "FOREIGN KEY (user_id) REFERENCES Users(id)" +
                        ");",
            itemConditions: "CREATE TABLE IF NOT EXISTS bidwars101.Item_Conditions (" +
                                "id INT NOT NULL PRIMARY KEY AUTO_INCREMENT," +
                                "item_condition VARCHAR(30) NOT NULL UNIQUE," +
                                "pre_condition BOOLEAN default false" +
                            ");",
            items: "CREATE TABLE IF NOT EXISTS bidwars101.Items (" +
                        "id INT NOT NULL PRIMARY KEY AUTO_INCREMENT," +
                        "user_id INT NOT NULL," +
                        "title VARCHAR(120) NOT NULL," +
                        "category_id INT NOT NULL," +
                        "item_condition_id INT NOT NULL," +
                        "price BIGINT NOT NULL," +
                        "selling_time INT NOT NULL," +
                        "purchase_duration INT NOT NULL," +
                        "created_at DATETIME DEFAULT NOW()," +
                        "FOREIGN KEY (user_id) REFERENCES Users(id)," +
                        "FOREIGN KEY (category_id) REFERENCES Categories(id)," +
                        "FOREIGN KEY (item_condition_id) REFERENCES Item_Conditions(id)" +
                    ");",
            itemImages: "CREATE TABLE IF NOT EXISTS bidwars101.Item_Images (" +
                            "id INT NOT NULL PRIMARY KEY AUTO_INCREMENT," +
                            "image BLOB NOT NULL," +
                            "item_id INT NOT NULL," +
                            "FOREIGN KEY (item_id) REFERENCES Items(id)" +
                        ");",
            rooms: "CREATE TABLE IF NOT EXISTS bidwars101.Rooms (" +
                        "id INT NOT NULL PRIMARY KEY AUTO_INCREMENT," +
                        "room_tag VARCHAR(10) NOT NULL" +
                    ");",
            auctionRooms: "CREATE TABLE IF NOT EXISTS bidwars101.Auction_Rooms (" +
                            "id INT NOT NULL PRIMARY KEY AUTO_INCREMENT," +
                            "room_id INT NOT NULL," +
                            "item_id INT NOT NULL," +
                            "auction_date DATETIME NOT NULL," +
                            "FOREIGN KEY (room_id) REFERENCES Rooms(id)," +
                            "FOREIGN KEY (item_id) REFERENCES Items(id)" +
                        ");",
            bids: "CREATE TABLE IF NOT EXISTS bidwars101.Bids (" +
                "id INT NOT NULL PRIMARY KEY AUTO_INCREMENT," +
                "bidder INT NOT NULL," +
                "item_id INT NOT NULL," +
                "offer BIGINT NOT NULL," +
                "awarded BOOLEAN DEFAULT false," +
                "created_at DATETIME DEFAULT NOW()," +
                "FOREIGN KEY (bidder) REFERENCES Users(id)," +
                "FOREIGN KEY (item_id) REFERENCES Items(id)" +
            ")"
        };

        // create tables
        Db.sendQuery(table.categories, con);
        Db.sendQuery(table.users, con);
        Db.sendQuery(table.notifications, con);
        Db.sendQuery(table.itemConditions, con);
        Db.sendQuery(table.items, con);
        Db.sendQuery(table.itemImages, con);
        Db.sendQuery(table.rooms, con);
        Db.sendQuery(table.auctionRooms, con);
        Db.sendQuery(table.bids, con);
    }

    static insertDefaultData(con){
        // categories
        Db.sendQuery("INSERT IGNORE INTO bidwars101.Categories (name) VALUES ('art'), ('electronics'), ('antiques'), ('vintage cars'), ('furniture');", con);

        // item conditions
        Db.sendQuery("INSERT IGNORE INTO bidwars101.Item_Conditions (item_condition, pre_condition) VALUES ('used', true), ('brand new', true), ('looks brand new', false), ('very old', false), ('broken and needs fixing', false), ('just needs little dusting', false);", con);

        // rooms (to be removed later)
        Db.sendQuery("INSERT IGNORE INTO bidwars101.Rooms (room_tag) VALUES ('alpha'), ('beta'), ('bolt'), ('101');", con);

        // users (to be removed later)
        Db.sendQuery("INSERT IGNORE INTO bidwars101.Users (name, email, password) VALUES ('solzy', 'solzyfrenzy1@gmail.com', 'passworded');", con);
    }
}