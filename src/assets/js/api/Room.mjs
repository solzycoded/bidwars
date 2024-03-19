import { Db } from "./database.mjs";
import { App } from "./util.js";

export class RoomApi {
    constructor(app, con){
        this.app = app;
        this.con = con;
    }

    initialize(){
        this.items();
        this.bidders();
        this.categories();
        this.read();
        this.images();
        this.bids();
        this.find();
        this.allItems();
    }

    read(){
        this.app.get('/api/rooms/live', async(req, res) => {
            try {
                const app = new App();

                const SQL    = "SELECT bidwars101.Rooms.id, bidwars101.Rooms.room_tag AS room " +
                    "FROM bidwars101.Rooms " + 
                    "INNER JOIN bidwars101.Auction_Rooms ON bidwars101.Auction_Rooms.room_id=bidwars101.Rooms.id " +
                    `WHERE auction_date = '${app.getTodaysDate()}' ` +
                    `AND HOUR(auction_start) >= '${app.getStartTime()}' ` +
                    `AND TIME(auction_end) <= '${app.getEndTime()}' ` +
                    "GROUP BY room_tag";
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

    categories(){
        this.app.get('/api/rooms/live/categories/:roomId', async(req, res) => {
            try {
                const { roomId } = req.params;

                // validation
                if(!roomId){
                    throw new Error("Room was not selected!");
                }
                const app = new App();

                const SQL    = "SELECT bidwars101.Categories.id, name " +
                    "FROM bidwars101.Auction_Rooms " +
                    "INNER JOIN bidwars101.Items ON bidwars101.Items.id=bidwars101.Auction_Rooms.item_id " +
                    "INNER JOIN bidwars101.Categories ON bidwars101.Items.category_id=bidwars101.Categories.id " +
                    `WHERE auction_date = '${app.getTodaysDate()}' ` +
                    `AND room_id = '${roomId}' ` +
                    `AND HOUR(auction_start) >= '${app.getStartTime()}' ` +
                    `AND TIME(auction_end) <= '${app.getEndTime()}' ` +
                    "GROUP BY name";

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

    find(){
        this.app.get('/api/rooms/live/:roomName', async(req, res) => {
            try {
                const { roomName } = req.params;

                // validation
                if(!roomName){
                    throw new Error("Room was not provided!");
                }
                const app = new App();

                const SQL    = "SELECT DISTINCT bidwars101.Rooms.id, COUNT(bidwars101.Bids.bidder) AS bidders, auction_end " +
                    "FROM bidwars101.Auction_Rooms " +
                    "INNER JOIN bidwars101.Rooms ON bidwars101.Rooms.id=bidwars101.Auction_Rooms.room_id " +
                    "INNER JOIN bidwars101.Bids ON bidwars101.Bids.item_id=bidwars101.Auction_Rooms.item_id " +
                    `WHERE auction_date = '${app.getTodaysDate()}' ` +
                    `AND bidwars101.Rooms.room_tag = '${roomName}' ` +
                    `AND HOUR(auction_start) >= '${app.getStartTime()}' ` +
                    `AND TIME(auction_end) <= '${app.getEndTime()}' ` +
                    "GROUP BY bidwars101.Rooms.id";

                const result = await Db.queryPromise(this.con, SQL);
                
                if(result.length > 0){
                    res.status(200).json({success: true, data: result[0]});
                }
                else{
                    res.status(200).json({success: false, data: {}});
                }
            } catch(err) {
                console.log(err);
            }
        });
    }

    bids(){
        this.app.get('/api/rooms/live/bids/:roomId', async(req, res) => {
            try {
                const { roomId } = req.params;

                // validation
                if(!roomId){
                    throw new Error("Room was not selected!");
                }
                const app = new App();

                const SQL    = "SELECT COUNT(bidwars101.Bids.item_id) as bids " +
                    "FROM bidwars101.Auction_Rooms " +
                    "INNER JOIN bidwars101.Bids ON bidwars101.Bids.item_id=bidwars101.Auction_Rooms.item_id " +
                    `WHERE auction_date = '${app.getTodaysDate()}' ` +
                    `AND room_id = '${roomId}' ` +
                    `AND HOUR(auction_start) >= '${app.getStartTime()}' ` +
                    `AND TIME(auction_end) <= '${app.getEndTime()}' ` +
                    "GROUP BY room_id";
                const result = await Db.queryPromise(this.con, SQL);
                
                if(result.length > 0){
                    res.status(200).json({success: true, data: result[0]});
                }
                else{
                    res.status(200).json({success: false, data: {bids: 0}});
                }
            } catch(err) {
                console.log(err);
            }
        });
    }

    images(){
        this.app.get('/api/rooms/live/images/:roomId', async(req, res) => {
            try {
                const { roomId } = req.params;

                // validation
                if(!roomId){
                    throw new Error("Room was not selected!");
                }

                const SQL    = "SELECT DISTINCT bidwars101.Items.id, image_text " +
                    "FROM bidwars101.Rooms " + 
                    "INNER JOIN bidwars101.Auction_Rooms ON bidwars101.Auction_Rooms.room_id=bidwars101.Rooms.id " +
                    "INNER JOIN bidwars101.Items ON bidwars101.Auction_Rooms.item_id=bidwars101.Items.id " +
                    "INNER JOIN bidwars101.Item_Images ON bidwars101.Item_Images.item_id=bidwars101.Items.id " +
                    `WHERE bidwars101.Rooms.id = ${roomId} ` +
                    "GROUP BY bidwars101.Items.id " +
                    "LIMIT 3";
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

    bidders(){
       this.app.get('/api/room/:room/total-bidders', async(req, res) => {
            try {
                const { room } = req.params;

                // validation
                if(!room){
                    throw new Error("Category not selected!");
                }

                const SQL    = "SELECT COUNT(bidwars101.Bids.bidder) AS bid_number " +
                    "FROM bidwars101.Rooms " + 
                    "INNER JOIN bidwars101.Auction_Rooms ON bidwars101.Rooms.id=bidwars101.Auction_Rooms.room_id " +
                    "RIGHT JOIN bidwars101.Items ON bidwars101.Items.id=bidwars101.Auction_Rooms.item_id " +
                    "INNER JOIN bidwars101.Bids ON bidwars101.Items.id=bidwars101.Bids.item_id " +
                    "WHERE auction_date == now() " +
                    "WHERE auction_end <= now() " +
                    `WHERE room_tag = '${room}'` +
                    "GROUP BY bid_number";
                const result = await Db.queryPromise(con, SQL);

                res.status(200).json(result);
            } catch(err) {
                console.log(err);
            }
        });
    }

    // GET SOME OF THE ITEMS IN A ROOM
    items(){
        this.app.get('/api/rooms/live/items/:roomId', async(req, res) => {
            try {
                const { roomId } = req.params;

                // validation
                if(!roomId){
                    throw new Error("Room was not selected!");
                }

                const app = new App();

                const SQL    = "SELECT bidwars101.Items.id, title " +
                    "FROM bidwars101.Auction_Rooms " +
                    "INNER JOIN bidwars101.Items ON bidwars101.Items.id=bidwars101.Auction_Rooms.item_id " +
                    `WHERE auction_date = '${app.getTodaysDate()}' ` +
                    `AND room_id = '${roomId}' ` +
                    // `AND TIME(auction_start) BETWEEN '${app.getEndTime()}' AND '${app.getStartTime()}' ` +
                    `AND HOUR(auction_start) <= '${app.getStartTime()}' ` +
                    `AND TIME(auction_end) >= '${app.getEndTime()}' ` +
                    "GROUP BY title "
                    "LIMIT 5";
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

    // GET ALL OF THE ITEMS IN A ROOM
    allItems(){
        this.app.get('/api/rooms/live/items/:roomId/all', async(req, res) => {
            try {
                const { roomId } = req.params;

                // validation
                if(!roomId){
                    throw new Error("Room was not selected!");
                }

                const app = new App();

                const SQL    = "SELECT bidwars101.Items.id, title, price, bidwars101.Categories.name AS category, image_text, COUNT(bidwars101.Bids.id) as bids " +
                    "FROM bidwars101.Auction_Rooms " +
                    "INNER JOIN bidwars101.Items ON bidwars101.Items.id=bidwars101.Auction_Rooms.item_id " +
                    "INNER JOIN bidwars101.Categories ON bidwars101.Categories.id=bidwars101.Items.category_id " +
                    "INNER JOIN bidwars101.Item_Images ON bidwars101.Items.id=bidwars101.Item_Images.item_id " +
                    "LEFT JOIN bidwars101.Bids ON bidwars101.Items.id=bidwars101.Bids.item_id " +
                    `WHERE auction_date = '${app.getTodaysDate()}' ` +
                    `AND room_id = '${roomId}' ` +
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
}