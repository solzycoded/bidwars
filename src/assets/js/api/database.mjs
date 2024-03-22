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
                        "password text NOT NULL," +
                        "role VARCHAR(8) NOT NULL," +
                        "token text NOT NULL," +
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
                        "title VARCHAR(120) NOT NULL UNIQUE," +
                        "category_id INT NOT NULL," +
                        "item_condition_id INT NOT NULL," +
                        "price BIGINT NOT NULL," +
                        "selling_time INT NOT NULL," +
                        "purchase_duration INT NOT NULL," +
                        "time_frame_id INT NOT NULL," +
                        "created_at DATETIME DEFAULT NOW()," +
                        "FOREIGN KEY (user_id) REFERENCES Users(id)," +
                        "FOREIGN KEY (category_id) REFERENCES Categories(id)," +
                        "FOREIGN KEY (time_frame_id) REFERENCES Time_Frames(id)," +
                        "FOREIGN KEY (item_condition_id) REFERENCES Item_Conditions(id)" +
                    ");",
            time_frames: "CREATE TABLE IF NOT EXISTS bidwars101.Time_Frames (" +
                        "id INT NOT NULL PRIMARY KEY AUTO_INCREMENT," +
                        "name VARCHAR(5) NOT NULL" +
                    ");",
            itemImages: "CREATE TABLE IF NOT EXISTS bidwars101.Item_Images (" +
                            "id INT NOT NULL PRIMARY KEY AUTO_INCREMENT," +
                            "image_blob BLOB," +
                            "image_text text," +
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
        // categories
        Db.sendQuery("INSERT IGNORE INTO bidwars101.Categories (name) VALUES ('art'), ('electronics'), ('antiques'), ('vintage cars'), ('furniture');", con);

        // item conditions
        Db.sendQuery("INSERT IGNORE INTO bidwars101.Item_Conditions (item_condition, pre_condition) VALUES ('used', true), ('brand new', true), ('looks brand new', false), ('very old', false), ('broken and needs fixing', false), ('just needs little dusting', false);", con);

        // rooms (to be removed later)
        Db.sendQuery("INSERT IGNORE INTO bidwars101.Rooms (room_tag) VALUES ('alpha'), ('beta'), ('bolt'), ('101');", con);

        // users (to be removed later)
        Db.sendQuery("INSERT IGNORE INTO bidwars101.Users (name, email, password) VALUES ('solzy', 'solzyfrenzy1@gmail.com', 'passworded'), ('mon', 'mon@gmail.com', 'passworded'), ('monny', 'monny@gmail.com', 'passworded');", con);

        // time_frames (to be removed later)
        Db.sendQuery("INSERT IGNORE INTO bidwars101.Time_Frames (name) VALUES ('year'), ('month'), ('day'), ('hour');", con);

        Db.insertItems(con);
    }

    static insertItems(con){
        const imageUrls = ["https://res.cloudinary.com/ellegacy/image/upload/v1710105271/car-2677839_640_ocgtdg.jpg", "https://res.cloudinary.com/ellegacy/image/upload/v1710105271/berlin-wall-50727_640_lagii5.jpg", "https://res.cloudinary.com/ellegacy/image/upload/v1710105273/porsche-5665390_640_sj11wg.jpg", "https://res.cloudinary.com/ellegacy/image/upload/v1710105274/automotive-1846910_640_b6fsra.jpg"];

        for (let index = 0; index < 30; index++) {
            const title                = "test title " + (Math.floor(Math.random() * 10) * Math.floor(Math.random() * 10));
            const categoryId = Db.generateRandomNumber(5);
            const itemConditionId = Db.generateRandomNumber(6);
            let price = Math.random() * 100000;
            const sellingTime = Math.random() * 10;
            const purchaseDuration = (Math.floor(Math.random() * 11) + 0);
            const timeFrameId = Db.generateRandomNumber(4);

            // items
            Db.sendQuery(`INSERT IGNORE INTO bidwars101.Items (user_id, title, category_id, item_condition_id, price, selling_time, purchase_duration, time_frame_id) VALUES (1, '${title}', '${categoryId}', '${itemConditionId}', '${price}', '${sellingTime}', '${purchaseDuration}', '${timeFrameId}');`, con);

            // item images
            let urlKey = Db.generateRandomNumber(3, 0);
            Db.sendQuery(`INSERT IGNORE INTO bidwars101.Item_Images (item_id, image_text) VALUES (${index + 1}, '${imageUrls[urlKey]}'), (${index + 1}, '${imageUrls[urlKey]}'), (${index + 1}, '${imageUrls[urlKey]}');`, con);

            // auction_rooms
            Db.auctionRoom(index, con);

            // bids
            let offer  = Db.generateRandomNumber(100000, 10);
            let bidder = Db.generateRandomNumber(3, 2);
            let itemId     = Db.generateRandomNumber(index + 1);

            Db.sendQuery(`INSERT IGNORE INTO bidwars101.Bids (bidder, item_id, offer) VALUES (${bidder}, '${itemId}', '${offer}');`, con);
        }
    }

    static generateRandomNumber(max, min = 1){
        return Math.floor((Math.random() * max) + min);
    }

    static auctionRoom(index, con){
        let roomId = Db.generateRandomNumber(4);
        let itemId = index + 1;

        let generateTodayDate = Db.generateRandomNumber(2);
        let liveActionDate    = generateTodayDate==2 ? true : false;

        const date = Db.createDate(liveActionDate);

        let hour   = date.hour;
        let minutes = date.minutes;

        const start = `${hour}:${minutes}:00`;
        const end   = `${hour + 2}:${minutes}:00`;

        Db.sendQuery(`INSERT IGNORE INTO bidwars101.Auction_Rooms (room_id, item_id, auction_date, auction_start, auction_end) VALUES (${roomId}, '${itemId}', '${date.date}', '${start}', '${end}');`, con);
    }

    static createDate(now = false){
        const years = [2023, 2024, 2022];
        let month   = Db.generateRandomNumber(12);
        let day     = Db.generateRandomNumber(28);

        let year    = years[Db.generateRandomNumber(years.length)];

        let hour    = Db.generateRandomNumber(23);
        let minutes = Db.generateRandomNumber(60);

        if(now){
            const today = new Date();

            year        = today.getFullYear();
            month       = today.getMonth() + 1;
            day         = today.getDate();

            hour        = today.getHours();
            minutes     = today.getMinutes();
        }

        let date = `${year}-${month}-${day}`;

        return {date, hour, minutes};
    }
}