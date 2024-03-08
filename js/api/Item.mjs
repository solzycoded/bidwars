
export class ItemApi {
    constructor(app, con){
        this.app = app;
        this.con = con;
    }

    initialize(){
        this.create();
        this.read();
        this.upcomingAuctions();
        this.liveAuctions();
        this.delete();
        this.edit();
        this.update();

        // remove later
        this.insert();
    }

    // default insertion
    insert(){
        let options = {
            url: 'http://localhost:3000/api/item/create',
            method: 'POST',
            body: '{"title": "oakwood deep", "category_id": 1, "user_id": 1, "item_condition_id": 1, "price": 2000, "selling_time": 4, "purchase_duration": 5}',
            headers: {
                "content-type": "application/json"
            }
        }

        fetch('http://localhost:3000/api/item/create', options)
            .then(response => response.json())
            .then(items => {
                // console.log(items);
            })
    }

    create(){
        this.app.post('/api/item/create', async(req, res) => {
            try {
                // collect all the data that comes in req.body (REQUEST HAS NO DATA IN ITS BODY)
                const {title, category_id, user_id, item_condition_id, price, selling_time, purchase_duration} = req.body;

                // validation
                if(!title && !category_id && !user_id && !item_condition_id && !price && !purchase_duration){
                    throw new Error("There are missing fields!");
                }

                // building query
                const item = [title, category_id, user_id, item_condition_id, price, selling_time, purchase_duration];
                const SQL  = "INSERT IGNORE INTO bidwars101.Items (title, category_id, user_id, item_condition_id, price, selling_time, purchase_duration) VALUES (?,?,?,?,?,?,?)";
                
                // getting result
                const result = await Db.queryPromise(this.con, SQL, item);
                
                if(result.insertId==0){
                    res.status(200).json({success: false, message: "The title you provided already exists!"});
                }
                else {
                    res.status(200).json({success: true, id: result.insertId, title});
                }
            } catch(err) {
                console.log(err);
            }
        });
    }

    delete(){
        // DELETE API
        this.app.delete('/api/item/delete/:id', async(req, res) => {
            try {
                // collect all the data that comes in req.body (REQUEST HAS NO DATA IN ITS BODY)
                const { id } = req.params;
        
                // validation
               
                // building query
                const item = [id];
                const SQL  = "DELETE FROM bidwars101.Items WHERE id = ?";
        
                // getting result
                await Db.queryPromise(this.con, SQL, item);
        
                res.status(200).json({success: true});
            } catch(err) {
                console.log(err);
            }
        });
    }

    read(){ // upcoming auctions
        // GET API
        this.app.get('/api/items', async(req, res) => {
            try {
                const SQL    = "SELECT title, price, bidwars101.Categories.name as category, image " +
                    "FROM bidwars101.Items " + 
                    "INNER JOIN bidwars101.Categories ON bidwars101.Categories.id=bidwars101.Items.category_id " +
                    "LEFT JOIN bidwars101.Item_Images ON bidwars101.Items.id=bidwars101.Item_Images.item_id "
                    "GROUP BY title";
                const result = await Db.queryPromise(this.con, SQL);
        
                res.status(200).json(result);
            } catch(err) {
                console.log(err);
            }
        });
    }

    upcomingAuctions(){ // upcoming auctions
        // GET API
        this.app.get('/api/items/upcoming', async(req, res) => {
            try {
                const SQL    = "SELECT title, price, bidwars101.Categories.name as category, image, COUNT(bidwars101.Auction_Rooms.item_id) AS bid_number " +
                    "FROM bidwars101.Items " + 
                    "INNER JOIN bidwars101.Categories ON bidwars101.Categories.id=bidwars101.Items.category_id " +
                    "LEFT JOIN bidwars101.Item_Images ON bidwars101.Items.id=bidwars101.Item_Images.item_id " +
                    "INNER JOIN bidwars101.Auction_Rooms ON bidwars101.Items.id=bidwars101.Auction_Rooms.item_id " +
                    "WHERE auction_date > now() " +
                    "LIMIT 10 " +
                    "GROUP BY title";
                const result = await Db.queryPromise(this.con, SQL);

                res.status(200).json(result);
            } catch(err) {
                console.log(err);
            }
        });
    }

    liveAuctions(){ // upcoming auctions
        // GET API
        this.app.get('/api/items/live', async(req, res) => {
            try {
                const SQL    = "SELECT title, price, bidwars101.Categories.name as category, image, COUNT(bidwars101.Auction_Rooms.item_id) AS bid_number " +
                    "FROM bidwars101.Items " + 
                    "INNER JOIN bidwars101.Categories ON bidwars101.Categories.id=bidwars101.Items.category_id " +
                    "LEFT JOIN bidwars101.Item_Images ON bidwars101.Items.id=bidwars101.Item_Images.item_id " +
                    "INNER JOIN bidwars101.Auction_Rooms ON bidwars101.Items.id=bidwars101.Auction_Rooms.item_id " +
                    "WHERE auction_date > now() " +
                    "LIMIT 5 " +
                    "GROUP BY title";
                const result = await Db.queryPromise(this.con, SQL);
        
                res.status(200).json(result);
            } catch(err) {
                console.log(err);
            }
        });
    }

    update(){
        // PUT API
        this.app.put('/api/item/update/:id', async(req, res) => {
            try {
                // collect all the data that comes in req.body (REQUEST HAS NO DATA IN ITS BODY)
                const {title, category_id, item_condition_id, price, selling_time, purchase_duration} = req.body;
                const { id } = req.params;
        
                // validation
                if(!title && !category_id && !item_condition_id && !price && !purchase_duration){
                    throw new Error("There are missing fields!");
                }
        
                // building query
                const item = [title, category_id, item_condition_id, price, selling_time, purchase_duration, id];
                const SQL  = "UPDATE bidwars101.Items SET title = ?, category_id = ?, item_condition_id = ?, price = ?, selling_time = ?, purchase_duration = ? WHERE id = ?";

                // getting result
                const result = await Db.queryPromise(this.con, SQL, item);

                res.status(200).json({success: true, id, title});
            } catch(err) {
                console.log(err);
            }
        });
    }

    edit(){
        // PUT API
        this.app.get('/api/item/edit/:id', async(req, res) => {
            try {
                // collect all the data that comes in req.body (REQUEST HAS NO DATA IN ITS BODY)
                const { id } = req.params;

                // building query
                const itemId = [id];
                const SQL  = "SELECT * FROM bidwars101.Items WHERE id = ?";
                
                // getting result
                const result = await Db.queryPromise(this.con, SQL, itemId);
                
                if(result.length > 0) {
                    res.status(200).json(result[0]);
                }
                else {
                    res.status(404).json({message: "The selected record does not exist"});
                }
            } catch(err) {
                console.log(err);
            }
        });
    }
}