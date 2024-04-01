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
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, 'imgs/items/');
//     },
//     filename: function (req, file, cb) {
//       cb(null, file.originalname);
//     }
// });

//Setting storage engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/imgs/items/'); // Use path.join to get the correct path
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

// Define limits for uploaded files
const limits = {
  fileSize: 10 * 1024 * 1024, // 10 MB (adjust this value according to your needs)
};

const upload = () => multer({ storage, limits });

// function storeItemImage(prefix){
//     app.post('imgs/items/', upload.single('image'), (req, res) => {
//         // Handle the uploaded file, save it to the server, and respond with the file path or URL
//         const filePath = path.join(__dirname, 'uploads', req.file.filename);
//         // Perform additional operations as needed, such as saving file metadata to a database
//         res.json({ filePath });
//     });

//     // app.post(`${prefix}create/:itemId`, createItemImage);
// }

// function saveImageFromBlob(blobData, filePath) {
//   // Create a buffer from the blob data
//   const buffer = Buffer.from(blobData, 'binary');

//   // Write the buffer to a file
//   fs.writeFile(filePath, buffer, 'binary', err => {
//       if (err) {
//           console.error('Error saving image:', err);
//       } else {
//           console.log('Image saved successfully');
//       }
//   });
// }

async function createItemImage(req, res) {
  const { itemId } = req.params;
  const image = req.file.filename;

  if(!image || !itemId){
    res.status(201).json({ success: false, data: { message: "Image file is missing." } });
  }

  let data = [itemId, image];

  itemImage.create(data, (err, result) => {
    try{
      if(result==undefined){
        res.status(201).json({ success: false, data: { message: "Image was not uploaded. Something went wrong." } });
      }
      else{
        res.status(201).json({ success: true, data: { message: "Your item was successfully created" } });
      }
    } catch(err) {
      res.status(201).json({ success: false, data: { message: "Image was not uploaded. Something went wrong." } });
    }
  });
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
  createItemImage,
  upload
};

export default ItemImageController;