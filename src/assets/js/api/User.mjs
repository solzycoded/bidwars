import { Db } from "./database.mjs"
import { App } from "./util.js"

export class UserApi {
    constructor(app, con){
        this.app = app;
        this.con = con;
    }

    initialize(){
        this.liveItems();
        this.otherItems();
        this.itemsBidOn();
        this.bids();
        this.create();
    }

    // GET ALL OF THE ITEMS THAT BELONG TO A USER
    liveItems(){
        this.app.get('/api/items/:userId/live', async(req, res) => {
            try {
                const { userId } = req.params;

                // validation
                if(!userId){
                    throw new Error("User Id was not selected!");
                }

                const app = new App();

                const SQL    = "SELECT bidwars101.Items.id, title, price, bidwars101.Categories.name AS category, image_text " +
                    "FROM bidwars101.Auction_Rooms " +
                    "INNER JOIN bidwars101.Items ON bidwars101.Items.id=bidwars101.Auction_Rooms.item_id " +
                    "INNER JOIN bidwars101.Users ON bidwars101.Items.user_id=bidwars101.Items.user_id " +
                    "INNER JOIN bidwars101.Categories ON bidwars101.Categories.id=bidwars101.Items.category_id " +
                    "INNER JOIN bidwars101.Item_Images ON bidwars101.Items.id=bidwars101.Item_Images.item_id " +
                    "LEFT JOIN bidwars101.Bids ON bidwars101.Items.id=bidwars101.Bids.item_id " +
                    `WHERE auction_date = '${app.getTodaysDate()}' ` +
                    `AND user_id = '${userId}' ` +
                    `AND HOUR(auction_start) >= '${app.getStartTime()}' ` +
                    `AND TIME(auction_end) <= '${app.getEndTime()}' ` +
                    "GROUP BY title";
                const result = await Db.queryPromise(this.con, SQL);

                if(result.length > 0){
                    res.status(200).json({success: true, data: result});
                }
                else{
                    res.status(200).json({success: false, data: []});
                }
            } catch(err) {
                console.log(err);
            }
        });
    }

    otherItems(){
        this.app.get('/api/items/:userId/others', async(req, res) => {
            try {
                const { userId } = req.params;

                // validation
                if(!userId){
                    throw new Error("User Id was not selected!");
                }

                const app = new App();

                const SQL    = "SELECT bidwars101.Items.id, title, price, bidwars101.Categories.name AS category, image_text " +
                    "FROM bidwars101.Auction_Rooms " +
                    "INNER JOIN bidwars101.Items ON bidwars101.Items.id=bidwars101.Auction_Rooms.item_id " +
                    "INNER JOIN bidwars101.Users ON bidwars101.Items.user_id=bidwars101.Items.user_id " +
                    "INNER JOIN bidwars101.Categories ON bidwars101.Categories.id=bidwars101.Items.category_id " +
                    "INNER JOIN bidwars101.Item_Images ON bidwars101.Items.id=bidwars101.Item_Images.item_id " +
                    "LEFT JOIN bidwars101.Bids ON bidwars101.Items.id=bidwars101.Bids.item_id " +
                    `WHERE auction_date <= '${app.getTodaysDate()}' ` +
                    `AND user_id = '${userId}' ` +
                    `AND TIME(auction_start) <= '${app.getStartTime()}' ` +
                    `AND TIME(auction_end) <= '${app.getStartTime()}' ` +
                    "GROUP BY title";
                const result = await Db.queryPromise(this.con, SQL);

                if(result.length > 0){
                    res.status(200).json({success: true, data: result});
                }
                else{
                    res.status(200).json({success: false, data: []});
                }
            } catch(err) {
                console.log(err);
            }
        });
    }

    itemsBidOn(){
        this.app.get('/api/items/:userId/bids', async(req, res) => {
            try {
                const { userId } = req.params;

                // validation
                if(!userId){
                    throw new Error("User Id was not selected!");
                }

                const app = new App();

                const SQL    = "SELECT bidwars101.Items.id, title " +
                    "FROM bidwars101.Bids " +
                    "INNER JOIN bidwars101.Items ON bidwars101.Items.id=bidwars101.Bids.item_id " +
                    `WHERE bidder = '${userId}' ` +
                    "GROUP BY title " +
                    "ORDER BY bidwars101.Bids.created_at";
                const result = await Db.queryPromise(this.con, SQL);

                if(result.length > 0){
                    res.status(200).json({success: true, data: result});
                }
                else{
                    res.status(200).json({success: false, data: []});
                }
            } catch(err) {
                console.log(err);
            }
        });
    }

    bids(){
        this.app.get('/api/items/:userId/bids/:itemId', async(req, res) => {
            try {
                const { userId, itemId } = req.params;

                // validation
                if(!userId || !itemId){
                    throw new Error("User and Item Id were not selected!");
                }

                const SQL    = "SELECT bidwars101.Bids.id, bidwars101.Bids.created_at, offer " +
                    "FROM bidwars101.Bids " +
                    `WHERE bidder = '${userId}' ` +
                    `AND item_id = '${itemId}' `
                    "ORDER BY id";
                const result = await Db.queryPromise(this.con, SQL);

                if(result.length > 0){
                    res.status(200).json({success: true, data: result});
                }
                else{
                    res.status(200).json({success: false, data: []});
                }
            } catch(err) {
                console.log(err);
            }
        });
    }

    create(){
        this.app.post('/api/users', async(req, res) => {
            try {
                const { email, username, password } = req.params;

                // validation
                if(!userId || !itemId){
                    throw new Error("User and Item Id were not selected!");
                }

                const app = new App();

                const SQL    = "SELECT bidwars101.Bids.id, bidwars101.Bids.created_at, offer " +
                    "FROM bidwars101.Bids " +
                    `WHERE bidder = '${userId}' ` +
                    `AND item_id = '${itemId}' `
                    "ORDER BY id";
                const result = await Db.queryPromise(this.con, SQL);

                if(result.length > 0){
                    res.status(200).json({success: true, data: result});
                }
                else{
                    res.status(200).json({success: false, data: []});
                }
            } catch(err) {
                console.log(err);
            }
        });
    }
}