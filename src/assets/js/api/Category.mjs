import { Db } from "./database.mjs"
import { App } from "./util.js"

export class CategoryApi {
    constructor(app, con){
        this.app = app;
        this.con = con;
    }

    initialize(){
        this.read();
        this.items();
    }

    // GET ALL CATEGORIES API
    read(){
       this.app.get('/api/categories', async(req, res) => {
            try {
                const SQL    = "SELECT * FROM bidwars101.Categories";
                const result = await Db.queryPromise(this.con, SQL);

                if(result.length > 0){
                    res.status(200).json({success: true, data: result});
                }
                else{
                    res.status(200).json({success: false, data: ""});
                }
            } catch(err) {
                console.log(err);
            }
        });
    }

    // GET ALL CATEGORIES API
    items(){
       this.app.get('/api/category/:category', async(req, res) => {
            try {
                const { category } = req.params;

                // validation
                if(!category){
                    throw new Error("Category not selected!");
                }

                const app = new App();

                const SQL = "SELECT bidwars101.Items.id as id, title, price, bidwars101.Categories.name as category, image_text as image, COUNT(bidwars101.Bids.item_id) as bid_number " +
                    "FROM bidwars101.Categories " + 
                    "INNER JOIN bidwars101.Items ON bidwars101.Categories.id=bidwars101.Items.category_id " +
                    "LEFT JOIN bidwars101.Item_Images ON bidwars101.Items.id=bidwars101.Item_Images.item_id " +
                    "INNER JOIN bidwars101.Auction_Rooms ON bidwars101.Items.id=bidwars101.Auction_Rooms.item_id " +
                    "RIGHT JOIN bidwars101.Bids ON bidwars101.Bids.item_id=bidwars101.Auction_Rooms.item_id " +
                    `WHERE bidwars101.Categories.name LIKE '%${category}' ` +
                    `AND auction_date = '${app.getTodaysDate()}' ` +
                    `AND HOUR(auction_start) >= '${app.getStartTime()}' ` +
                    `AND TIME(auction_end) <= '${app.getEndTime()}' ` +
                    "GROUP BY title " +
                    "ORDER BY bid_number DESC";
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