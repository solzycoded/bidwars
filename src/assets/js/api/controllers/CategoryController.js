// controllers/categoryController.js
import Category from '../models/Category.js';

let db;
let category;

function injectDB(database) {
    db = database;

    category = new Category(db);
}

async function getLiveItemsInACategory(req, res) {
    const { name } = req.params;

    // validation
    if(!name){
        throw new Error("There are missing fields!");
    }

    const data = [name];

    category.items(data, (err, result) => {
        try{
            if(result!=undefined && result.length > 0){
                res.status(200).json({success: true, data: result});
            }
            else{
                res.status(200).json({success: false, data: []});
            }
        } catch(err) {
            console.error(err);
        }
    });
}


async function getAllCategories(req, res) {
    category.read(null, (err, result) => {
        try{
            if(result!=undefined && result.length > 0){
                res.status(200).json({success: true, data: result});
            }
            else{
                res.status(200).json({success: false, data: []});
            }
        } catch(err) {
            console.error(err);
        }
    });
}

const CategoryController = {
    getLiveItemsInACategory,
    injectDB,
    getAllCategories,
};

export default CategoryController;