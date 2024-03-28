import { Db } from "./database.mjs"
import express, { response } from "express"
import bodyParser from "body-parser"
import cors from "cors"
import { ItemImageApi } from "./ItemImage.mjs"
import { ItemApi } from "./Item.mjs"
import { RoomApi } from "./Room.mjs"
import { CategoryApi } from "./Category.mjs";
import { SearchApi } from "./Search.mjs"
import { UserApi } from "./User.mjs"
import { TimeFrameApi } from "./TimeFrame.mjs"
import { ItemConditionApi } from "./ItemCondition.mjs"

import userController from './controllers/UserController.js';
import itemController from './controllers/ItemController.js';
import itemImageController from './controllers/ItemImageController.js';
import bidController from './controllers/BidController.js';

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
const prefix = "/api/";

/* USERS */
userController.injectDB(con);

const userPrefix = `${prefix}users/`;
app.post(`${userPrefix}signup`, userController.createUser);
app.post(`${userPrefix}login`, userController.loginUser);
app.post(`${userPrefix}create-token`, userController.createUserToken);
/* end USERS */

/* ITEMS */
itemController.injectDB(con);

const itemPrefix = `${prefix}items/`;
app.post(`${itemPrefix}create/:userId`, itemController.createItem);
app.get(`${itemPrefix}check-title/:title`, itemController.checkTitle);
app.get(`${itemPrefix}:title`, itemController.findByName);
app.get(`${itemPrefix}:id/id`, itemController.findById);
app.get(`${itemPrefix}live/all`, itemController.liveAuctionItems);
/* end ITEMS */

/* ITEMIMAGES */
itemImageController.injectDB(con);
// itemImageController.injectApp(app);

const itemImagePrefix = `${prefix}item-images/`;
const upload = itemImageController.upload();

app.post(`${itemImagePrefix}create/:itemId`, upload.array('image'), itemImageController.createItemImage);
/* end ITEMIMAGES */

/* ITEMS */
bidController.injectDB(con);

const bidPrefix = `${prefix}items/`;
app.get(`${bidPrefix}:itemId/bids`, bidController.getTotalBids);
/* end ITEMS */

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

/* TIME FRAME API */
new TimeFrameApi(app, con).initialize();
/* end TIME FRAME API */

/* ITEM CONDITION API */
new ItemConditionApi(app, con).initialize();
/* end ITEM CONDITION API */