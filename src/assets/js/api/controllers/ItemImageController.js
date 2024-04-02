// controllers/itemController.js
import ItemImage from '../models/ItemImage.js';
import multer from 'multer';

let db;
let itemImage;

function injectDB(database) {
    db = database;

    itemImage = new ItemImage(db);
}

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

async function getItemImage(req, res) {
  const { itemId } = req.params;

  if(!itemId){
    return res.status(406).json({success: false, data: {message: "Some fields are missing!"}});
  }

  let data = [itemId];

  itemImage.read(data, (err, result) => {
    try{
      if(result!=undefined && result.length > 0){
        res.status(200).json({ success: true, data: result });
      }
      else{
        res.status(200).json({ success: false, data: [] });
      }
    } catch(err) {
      return res.status(500).json({ success: false, data: { message: "Something went wrong.", error: err } });
    }
  });
}

const ItemImageController = {
  injectDB,
  createItemImage,
  upload,
  getItemImage
};

export default ItemImageController;