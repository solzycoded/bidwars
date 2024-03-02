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
                console.log("Created");

                Db.createTables(con);
            }
        );
    }

    static createDb(con) {
        con.connect(function(err) {
            if (err) throw err;
            console.log("Connected!");

            Db.sendQuery("DROP DATABASE IF EXISTS bidwars101", con);
            Db.sendQuery("CREATE DATABASE IF NOT EXISTS bidwars101", con);
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
                        "created_at TIMESTAMP" +
                    ");",
            notifications: "CREATE TABLE IF NOT EXISTS bidwars101.Notifications (" +
                            "id INT NOT NULL PRIMARY KEY AUTO_INCREMENT," +
                            "user_id INT NOT NULL," +
                            "message TEXT NOT NULL," +
                            "created_at TIMESTAMP," +
                            "FOREIGN KEY (user_id) REFERENCES Users(id)" +
                        ");",
            itemConditions: "CREATE TABLE IF NOT EXISTS bidwars101.Item_Conditions (" +
                                "id INT NOT NULL PRIMARY KEY AUTO_INCREMENT," +
                                "item_condition VARCHAR(30) NOT NULL UNIQUE" +
                            ");",
            items: "CREATE TABLE IF NOT EXISTS bidwars101.Items (" +
                        "id INT NOT NULL PRIMARY KEY AUTO_INCREMENT," +
                        "user_id INT NOT NULL," +
                        "title VARCHAR(120) NOT NULL UNIQUE," +
                        "category_id INT NOT NULL," +
                        "item_condition_id INT NOT NULL," +
                        "price BIGINT NOT NULL," +
                        "selling_time INT NOT NULL," +
                        "purchase_duration INT NOT NULL," +
                        "created_at TIMESTAMP," +
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
                        "room_number VARCHAR(10) NOT NULL" +
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
                "created_at TIMESTAMP," +
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
}