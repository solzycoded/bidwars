import { Db } from "./database.mjs"
import express, { response } from "express"
import bodyParser from "body-parser"
import cors from "cors"

class Api{
    constructor(con){
        // create database, it's tables and do a few inserts
        Db.createDb(con);

        this.app = this.initializeApp();
        this.startServer();
    }

    initializeApp(){
        // initialize express
        const app = express();

        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({extended: true}));

        // app.use(cors(this.setCorsOptions));

        return app;
    }

    // default insertion END (to be removed later)
    setCorsOptions(){
        const corsOptions = {
            origin: '*', 
            credentials: true,            //access-control-allow-credentials:true
            optionSuccessStatus: 200,
        };

        return corsOptions;
    }

    startServer(){
        const port = process.env.port || 3000;

        this.app.listen(port, () => {
            console.log("server running on port: 3000");
        });
    }

    getApp(){
        return this.app;
    }
}

// create DB connection
const con  = Db.con();

const app = new Api(con).getApp();


/* ITEMS */
class ItemApi {
    constructor(app, con){
        this.app = app;
        this.con = con;
    }

    initialize(){
        this.create();
        this.read();
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
                const item   = [title, category_id, user_id, item_condition_id, price, selling_time, purchase_duration];
                const SQL    = "INSERT IGNORE INTO bidwars101.Items (title, category_id, user_id, item_condition_id, price, selling_time, purchase_duration) VALUES (?,?,?,?,?,?,?)";
                
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

    read(){
        // GET API
        this.app.get('/api/items', async(req, res) => {
            try {
                const SQL    = "SELECT * FROM bidwars101.Items";
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

new ItemApi(app, con).initialize();
/* end ITEMS */


/* CATEGORIES */
class CategoryApi {
    constructor(app, con){
        this.app = app;
        this.con = con;
    }

    initialize(){
        this.read();
    }

    // GET ALL CATEGORIES API
    read(){
        app.get('/api/categories', async(req, res) => {
            try {
                const SQL    = "SELECT * FROM bidwars101.Categories";
                const result = await Db.queryPromise(con, SQL);
        
                res.status(200).json(result);
            } catch(err) {
                console.log(err);
            }
        });
    }
}

new CategoryApi(app, con).read();
/* end CATEGORIES */

/* SEARCH API */
class SearchApi {
    constructor(app, con){
        this.app = app;
        this.con = con;
    }

    initialize(){
        this.search();
    }

    search(){
        // PUT API
        this.app.post('/api/search', async(req, res) => {
            try {
                // collect all the data that comes in req.body
                const { search, categories } = req.body;

                // building query
                let   filterConditions = this.categoryFilter(categories);
                const searchQuery = categories.concat(["%" + search + "%"]);

                const SQL         = "SELECT title FROM bidwars101.Items " + 
                    "INNER JOIN bidwars101.Categories ON bidwars101.Categories.id=bidwars101.Items.category_id " + 
                    "WHERE " + filterConditions + "title LIKE ?";

                // getting result
                const result      = await Db.queryPromise(this.con, SQL, searchQuery);

                if(result.length > 0){
                    res.status(200).json(result);
                }
                else {
                    res.status(200).json({message: "No records found!"});
                }
            } catch(err) {
                console.log(err);
                // res.status(500).json({message: "Something went wrong!"});
            }
        });
    }

    categoryFilter(categories){
        let conditions = "";

        for (let i = 0; i < categories.length; i++) {
            conditions += "name = ? AND ";
        }

        return conditions;
    }
}

new SearchApi(app, con).initialize();
/* end SEARCH API */
