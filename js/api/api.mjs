import { Db } from "./database.mjs"
import express from "express"
import bodyParser from "body-parser"

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

        return app;
    }

    startServer(){
        this.app.listen(3000, () => {
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
    }

    create(){
        this.app.post('/item/create', async(req, res) => {
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
        this.app.delete('/item/delete/:id', async(req, res) => {
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
        this.app.get('/items', async(req, res) => {
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
        this.app.put('/item/update/:id', async(req, res) => {
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
        this.app.get('/item/edit/:id', async(req, res) => {
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
        app.get('/categories', async(req, res) => {
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
        this.read();
    }
    
    read(){
        // PUT API
        this.app.get('/search', async(req, res) => {
            try {
                // collect all the data that comes in req.body (REQUEST HAS NO DATA IN ITS BODY)
                const { search, categories } = req.body; // i'm only implementing the search query for now, without the category

                // building query
                const searchQuery = ["%" + search + "%"];
                const SQL         = "SELECT id, title FROM bidwars101.Items WHERE title LIKE ?";
                
                // getting result
                const result      = await Db.queryPromise(this.con, SQL, searchQuery);

                res.status(200).json(result);
            } catch(err) {
                console.log(err);
            }
        });
    }
}

new SearchApi(app, con).initialize();
/* end SEARCH API */
