// controllers/notificationController.js
import Notification from '../models/Notification.js';

let db;
let notification;

function injectDB(database) {
    db = database;

    notification = new Notification(db);
}

async function getUserNotifications(req, res) {
    const { userId } = req.params;

    // validation
    if(!userId){
        return res.status(406).json({success: false, data: {message: "There are missing values!"}});
    }

    const data = [userId];

    notification.forUser(data, (err, result) => {
        try{
            if(result!=undefined && result.length > 0){
                res.status(200).json({success: true, data: result});
            }
            else{
                res.status(200).json({success: false, data: []});
            }
        } catch(err) {
            return res.status(500).json({success: false, data: {message: "Someting went wrong", error: err}});
        }
    });
}

async function createNotification(req, res) {
    const { user_id, message } = req.body;

    // validation
    if(!user_id || !message){
        return res.status(406).json({success: false, data: {message: "There are missing values!"}});
    }

    const data = [user_id, message];

    notification.create(data, (err, result) => {
        try{
            if(result==undefined){
                res.status(201).json({success: false, data: null});
            }
            else{
                res.status(200).json({success: true, data: null});
            }
        } catch(err) {
            return res.status(500).json({success: false, data: {message: "Someting went wrong", error: err}});
        }
    });
}

const NotificationController = {
    createNotification,
    injectDB,
    getUserNotifications,
};

export default NotificationController;