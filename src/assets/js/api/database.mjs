import mysql from "mysql";
import bcrypt from 'bcrypt';

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
            }
        );
    }

    static createDb(con) {
        con.connect(function(err) {
            if (err) throw err;
            console.log("Connected!");

            // Db.sendQuery("DROP DATABASE IF EXISTS bidwars101", con);
            Db.sendQuery("CREATE DATABASE IF NOT EXISTS bidwars101", con);
            Db.createTables(con);
            Db.insertDefaultData(con);
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
                        "password text NOT NULL," +
                        "role VARCHAR(8) NOT NULL," +
                        "token text," +
                        "created_at DATETIME DEFAULT NOW()" +
                    ");",
            notifications: "CREATE TABLE IF NOT EXISTS bidwars101.Notifications (" +
                            "id INT NOT NULL PRIMARY KEY AUTO_INCREMENT," +
                            "user_id INT NOT NULL," +
                            "message TEXT NOT NULL," +
                            "un_read BOOLEAN DEFAULT true," +
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
                        "title VARCHAR(120) NOT NULL UNIQUE," +
                        "category_id INT NOT NULL," +
                        "current_condition_id INT NOT NULL," +
                        "pre_condition_id INT NOT NULL," +
                        "price BIGINT NOT NULL," +
                        "selling_time INT NOT NULL," +
                        "purchase_duration INT NOT NULL," +
                        "time_frame_id INT NOT NULL," +
                        "created_at DATETIME DEFAULT NOW()," +
                        "sold BOOLEAN DEFAULT FALSE," +
                        "date_sold DATETIME," +
                        "FOREIGN KEY (user_id) REFERENCES Users(id)," +
                        "FOREIGN KEY (category_id) REFERENCES Categories(id)," +
                        "FOREIGN KEY (time_frame_id) REFERENCES Time_Frames(id)," +
                        "FOREIGN KEY (current_condition_id) REFERENCES Item_Conditions(id)," +
                        "FOREIGN KEY (pre_condition_id) REFERENCES Item_Conditions(id)" +
                    ");",
            time_frames: "CREATE TABLE IF NOT EXISTS bidwars101.Time_Frames (" +
                        "id INT NOT NULL PRIMARY KEY AUTO_INCREMENT," +
                        "name VARCHAR(5) NOT NULL" +
                    ");",
            itemImages: "CREATE TABLE IF NOT EXISTS bidwars101.Item_Images (" +
                            "id INT NOT NULL PRIMARY KEY AUTO_INCREMENT," +
                            "image_blob text," +
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
                            "auction_date DATE NOT NULL," +
                            "auction_start TIME NOT NULL," +
                            "auction_end TIME NOT NULL," +
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
        Db.sendQuery(table.time_frames, con);
    }

    static insertDefaultData(con){
        Db.createCustomerUser1(con);

        // categories
        Db.sendQuery("INSERT IGNORE INTO bidwars101.Categories (name) VALUES ('art'), ('electronics'), ('antiques'), ('vintage cars'), ('furniture');", con);

        // item conditions
        Db.sendQuery("INSERT IGNORE INTO bidwars101.Item_Conditions (item_condition, pre_condition) VALUES ('used', true), ('brand new', true), ('looks brand new', false), ('very old', false), ('broken and needs fixing', false), ('just needs little dusting', false);", con);

        Db.createAdminUser(con);

        // rooms (to be removed later)
        Db.sendQuery("INSERT IGNORE INTO bidwars101.Rooms (room_tag) VALUES ('alpha'), ('beta'), ('bolt'), ('101');", con);

        // time_frames (to be removed later)
        Db.sendQuery("INSERT IGNORE INTO bidwars101.Time_Frames (name) VALUES ('year'), ('month'), ('day'), ('hour');", con);
    }

    static async createAdminUser(con){
        bcrypt.hash('coveredinpassworded3421', 10, (err, hash) => {
            if (err) {
                return;
            }

            Db.sendQuery(`INSERT IGNORE INTO bidwars101.Users (name, email, password, role) VALUES ('admin', 'admin@bidwars.com', '${hash}', 'admin');`, con);
        });
    }

    static async createCustomerUser1(con){
        bcrypt.hash('passworded', 10, (err, hash) => {
            if (err) {
                return;
            }

            Db.sendQuery(`INSERT IGNORE INTO bidwars101.Users (name, email, password, role) VALUES ('solzy1', 'solzycoded@gmail.com', '${hash}', 'user');`, con);
        });
    }
}