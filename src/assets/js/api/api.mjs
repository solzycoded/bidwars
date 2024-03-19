import { Db } from "./database.mjs"
import express, { response } from "express"
import bodyParser from "body-parser"
import cors from "cors"
import { ItemImageApi } from "./ItemImage.mjs"
import { ItemApi } from "./Item.mjs"
import { RoomApi } from "./Room.mjs"
import { CategoryApi } from "./Category.mjs";
import { SearchApi } from "./Search.mjs"
import { BidApi } from "./Bid.mjs"
import { UserApi } from "./User.mjs"

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

        app.use(cors());

        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({extended: true}));

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
/* item images */
new ItemImageApi(app, con).initialize();
/* item images END */

new ItemApi(app, con).initialize();
/* end ITEMS */

/* USERS */
new UserApi(app, con).initialize();
/* end USERS */

/* ROOMS */
new RoomApi(app, con).initialize();
/* end ROOMS */

/* CATEGORIES */
new CategoryApi(app, con).initialize();
/* end CATEGORIES */

/* SEARCH API */
new SearchApi(app, con).initialize();
/* end SEARCH API */

/* SEARCH API */
new BidApi(app, con).initialize();
/* end SEARCH API */
