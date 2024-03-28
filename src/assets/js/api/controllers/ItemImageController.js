// controllers/itemController.js
import ItemImage from '../models/ItemImage.js';
import fs from "fs";
import { App } from "../util.js";
import multer from 'multer';
import path from 'path';

let db;
let itemImage;

function injectDB(database) {
    db = database;

    itemImage = new ItemImage(db);
}

// function injectApp(appInstance) {
//     app = appInstance;
// }


// Multer configuration to handle file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'imgs/items/');
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
});

const upload = () => {return multer({ storage })};

// function storeItemImage(prefix){
//     app.post('imgs/items/', upload.single('image'), (req, res) => {
//         // Handle the uploaded file, save it to the server, and respond with the file path or URL
//         const filePath = path.join(__dirname, 'uploads', req.file.filename);
//         // Perform additional operations as needed, such as saving file metadata to a database
//         res.json({ filePath });
//     });
  
//     // app.post(`${prefix}create/:itemId`, createItemImage);
// }

async function createItemImage(req, res) {
    // const { images } = req.body;
    // const { itemId } = req.params;

    // const data  = [itemId];

    // storeImages(images);
    const filePaths = req.files.map(file => path.join(__dirname, 'imgs/items', file.filename));
    // Perform additional operations as needed, such as saving file metadata to a database
    res.json({ filePaths });
    // item.create(data, (err, result) => {
    //     try{
    //         if(result.insertId==undefined){
    //             res.status(201).json({ success: false, data: { message: "Title already exists! Please type something else." } });
    //         }
    //         else{
    //             res.status(201).json({ success: true, data: { id: result.insertId } });
    //         }
    //     } catch(err) {
    //         res.status(201).json({ success: false, data: { message: "Title already exists! Please type something else." } });
    //     }
    // });
}

// function storeImages(images){
//     images.forEach((image) => {
//         storeImage(image);
//     });
// }

// function storeImage(imageData){
//     const imageExtension = getImageExtension(imageData);

//     console.log(imageExtension);
//     // let imageName = `imgs/items/${App.rand(10)}.${imageExtension}`;
//     // fs.writeFile(imageName, imageData, 'binary', (err) => {
//     //     if (err) throw err;
//     //     console.log('Image saved successfully');
//     // });
// }

// function getImageExtension(binary){
//     // data:image/jpeg;base64
//     let splitBinary = binary.split(";");

//     let splitBinaryPrefix = splitBinary[0].split("/");

//     let fileExtension = splitBinaryPrefix[1];

//     return fileExtension;
// }

const ItemImageController = {
    injectDB,
    // injectApp,
    createItemImage,
    upload
};

export default ItemImageController;