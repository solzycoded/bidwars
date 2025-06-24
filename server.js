import { Db } from "./api/database.mjs"
import express from "express"
import bodyParser from "body-parser"
import cors from "cors"

import userController from './api/controllers/UserController.mjs';
import itemController from './api/controllers/ItemController.mjs';
import itemImageController from './api/controllers/ItemImageController.mjs';
import bidController from './api/controllers/BidController.mjs';
import roomController from './api/controllers/RoomController.mjs';
import auctionRoomController from './api/controllers/AuctionRoomController.mjs';
import notificationController from './api/controllers/NotificationController.mjs';
import categoryController from './api/controllers/CategoryController.mjs';
import itemConditionController from './api/controllers/ItemConditionController.mjs';
import timeFrameController from './api/controllers/TimeFrameController.mjs';

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

        // Parse JSON bodies (as sent by API clients)
        app.use(bodyParser.json({ limit: '100mb' }));

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
const con = Db.con();

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
app.get(`${itemPrefix}all/available`, itemController.availableItems);
app.delete(`${itemPrefix}:itemId`, itemController.deleteItem);
app.get(`${itemPrefix}:itemId/bidders`, itemController.getItemBidders);
app.get(`${itemPrefix}:userId/all-items`, itemController.allUserItems);
app.post(`${itemPrefix}search`, itemController.searchForItems);
app.get(`${itemPrefix}:userId/bids/:itemId`, itemController.userBiddingHistory);
/* end ITEMS */
 
/* ITEMIMAGES */
itemImageController.injectDB(con);

const itemImagePrefix = `${prefix}item-images/`;
const upload = itemImageController.upload();

app.post(`${itemImagePrefix}create/:itemId`, upload.single('image'), itemImageController.createItemImage);
app.get(`${prefix}item/image/:itemId`, itemImageController.getItemImage);
/* end ITEMIMAGES */

/* BIDS */
bidController.injectDB(con);

const bidPrefix = `${prefix}items/`;
app.get(`${bidPrefix}:itemId/bids`, bidController.getTotalBids);
app.get(`${bidPrefix}:bidder/bidder-items`, bidController.getBidderItems);
app.post(`${bidPrefix}:itemId/bids`, bidController.createBid);
/* end BIDS */

/* ROOMS */
roomController.injectDB(con);

const roomPrefix = `${prefix}rooms/`;
app.get(`${roomPrefix}all`, roomController.allRooms);
app.get(`${roomPrefix}live/items/:roomId`, roomController.itemsInARoom);
app.get(`${roomPrefix}live`, roomController.getLiveRooms);
app.get(`${roomPrefix}live/images/:roomId`, roomController.getImagesInARoom);
app.get(`${roomPrefix}live/bids/:roomId`, roomController.totalBidsInARoom);
app.get(`${roomPrefix}live/categories/:roomId`, roomController.categoriesInARoom);
app.get(`${roomPrefix}live/items/:roomId/all`, roomController.allItemsInARoom);
app.get(`${roomPrefix}live/:roomName`, roomController.findRoom);
/* end ROOMS */

/* AUCTION ROOMS */
auctionRoomController.injectDB(con);

const auctionRoomPrefix = `${prefix}auction-rooms/`;
app.post(`${auctionRoomPrefix}`, auctionRoomController.createAuction);
app.get(`${auctionRoomPrefix}dates/all`, auctionRoomController.allAuctionDates);
app.get(`${auctionRoomPrefix}start-times/all`, auctionRoomController.allStartTimes);
app.get(`${auctionRoomPrefix}items/all`, auctionRoomController.allAuctionItems);
app.post(`${auctionRoomPrefix}items/filter`, auctionRoomController.filteredItems);
app.delete(`${auctionRoomPrefix}:id`, auctionRoomController.deleteAuctionItem);
/* end AUCTION ROOMS */

/* NOTIFICATIONS */
notificationController.injectDB(con);

const notificationPrefix = `${prefix}notifications/`;
app.post(`${notificationPrefix}`, notificationController.createNotification);
app.get(`${notificationPrefix}:userId`, notificationController.getUserNotifications);
/* end NOTIFICATIONS */

/* CATEGORIES */
categoryController.injectDB(con);

const categoryPrefix = `${prefix}category/`;
app.get(`${categoryPrefix}:name`, categoryController.getLiveItemsInACategory);
app.get(`${prefix}categories`, categoryController.getAllCategories);
/* end CATEGORIES */

/* ITEM CONDITIONS */
itemConditionController.injectDB(con);

const itemConditionPrefix = `${prefix}item-conditions/`;
app.get(`${itemConditionPrefix}:type`, itemConditionController.getItemConditions);
/* end ITEM CONDITIONS */


/* TIME FRAMES */
timeFrameController.injectDB(con);

const timeFramePrefix = `${prefix}time-frames/`;
app.get(`${timeFramePrefix}`, timeFrameController.getTimeFrameList);
/* end TIME FRAMES */