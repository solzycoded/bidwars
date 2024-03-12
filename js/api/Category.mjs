
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

                res.status(200).json(result);
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

                const SQL    = "SELECT title, price, bidwars101.Categories.name as category, image, COUNT(bidwars101.Auction_Rooms.item_id) AS bid_number " +
                    "FROM bidwars101.Categories " + 
                    "INNER JOIN bidwars101.Items ON bidwars101.Categories.id=bidwars101.Items.category_id " +
                    "LEFT JOIN bidwars101.Item_Images ON bidwars101.Items.id=bidwars101.Item_Images.item_id " +
                    "INNER JOIN bidwars101.Auction_Rooms ON bidwars101.Items.id=bidwars101.Auction_Rooms.item_id " +
                    "WHERE auction_date > now() " +
                    `WHERE name = '${category}'` +
                    "LIMIT 5 " +
                    "GROUP BY title";
                const result = await Db.queryPromise(this.con, SQL);

                res.status(200).json(result);
            } catch(err) {
                console.log(err);
            }
        });
    }
}