export class RoomApi {
    constructor(app, con){
        this.app = app;
        this.con = con;
    }

    initialize(){
        this.items();
        this.bidders();
        this.categories();
    }

    // GET THE UNIQUE NUMBER OF BIDDERS CURRENTLY IN THE ROOM
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

    categories(){
        this.app.get('/api/room/:room/categories', async(req, res) => {
            try {
                const { room } = req.params;

                // validation
                if(!room){
                    throw new Error("Category not selected!");
                }

                const SQL    = "SELECT COUNT(bidwars101.Bids.bidders) AS bid_number " +
                    "FROM bidwars101.Rooms " + 
                    "INNER JOIN bidwars101.Auction_Rooms ON bidwars101.Rooms.id=bidwars101.Auction_Rooms.room_id " +
                    "RIGHT JOIN bidwars101.Items ON bidwars101.Items.id=bidwars101.Auction_Rooms.item_id " +
                    "INNER JOIN bidwars101.Bids ON bidwars101.Items.id=bidwars101.Bids.item_id " +
                    "WHERE auction_date == now() " +
                    "WHERE auction_end <= now() " +
                    `WHERE room_tag = '${room}'` +
                    "GROUP BY bid_number";
                const result = await Db.queryPromise(this.con, SQL);

                res.status(200).json(result);
            } catch(err) {
                console.log(err);
            }
        });
    }

    // GET ALL CATEGORIES API
    items(){
       this.app.get('/api/room/:room', async(req, res) => {
            try {
                const { room } = req.params;

                // validation
                if(!room){
                    throw new Error("Category not selected!");
                }

                const SQL    = "SELECT title, price, bidwars101.Categories.name as category, image, COUNT(bidwars101.Bids.item_id) AS bid_number " +
                    "FROM bidwars101.Rooms " + 
                    "INNER JOIN bidwars101.Auction_Rooms ON bidwars101.Rooms.id=bidwars101.Auction_Rooms.room_id " +
                    "RIGHT JOIN bidwars101.Items ON bidwars101.Items.id=bidwars101.Auction_Rooms.item_id " +
                    "INNER JOIN bidwars101.Categories ON bidwars101.Categories.id=bidwars101.Items.category_id " +
                    "LEFT JOIN bidwars101.Item_Images ON bidwars101.Items.id=bidwars101.Item_Images.item_id " +
                    "INNER JOIN bidwars101.Bids ON bidwars101.Items.id=bidwars101.Bids.item_id " +
                    "WHERE auction_date == now() " +
                    "WHERE auction_end <= now() " +
                    `WHERE room_tag = '${room}'` +
                    "GROUP BY title";
                const result = await Db.queryPromise(con, SQL);

                res.status(200).json(result);
            } catch(err) {
                console.log(err);
            }
        });
    }
}