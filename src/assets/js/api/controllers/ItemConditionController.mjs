// controllers/itemconditionController.js
import ItemCondition from '../models/ItemCondition.mjs';

let db;
let itemcondition;

function injectDB(database) {
    db = database;

    itemcondition = new ItemCondition(db);
}

async function getItemConditions(req, res) {
    const { type } = req.params;

    // validation
    if(!type){
        return res.status(406).json({success: false, data: {message: "There are missing values!"}});
    }

    const condition = type=="pre" ? true : false;
    const data = [condition];

    itemcondition.read(data, (err, result) => {
        try{
            if(result!=undefined && result.length > 0){
                res.status(200).json({success: true, data: result});
            }
            else{
                res.status(201).json({success: false, data: []});
            }
        } catch(err) {
            return res.status(500).json({success: false, data: {message: "Something went wrong!", error: err}});
        }
    });
}

const ItemConditionController = {
    injectDB,
    getItemConditions,
};

export default ItemConditionController;