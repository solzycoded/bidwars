import { Db } from "./database.mjs"

export class ItemImageApi {
    constructor(app, con){
        this.app = app;
        this.con = con;
    }

    initialize(){
        this.create();
        this.update();
        this.read();
    }

    create(){
        this.app.post('/api/item/image/create', async(req, res) => {
            try {
                // collect all the data that comes in req.body (REQUEST HAS NO DATA IN ITS BODY)
                const { item_id, images } = req.body;

                // validation
                if(!item_id && !images && images.length==3){
                    throw new Error("There are missing fields!");
                }

                // building query
                const SQL  = `INSERT IGNORE INTO bidwars101.Item_Images (item_id, image) VALUES (${item_id}, ${images[0]}), ((${item_id}, ${images[1]}), ((${item_id}, ${images[2]})`;

                // getting result
                const result = await Db.queryPromise(this.con, SQL);

                // if(result.insertId==0){
                //     res.status(400).json({success: false, message: "The insertion was unsuccessful!"});
                // }
                // else {
                    res.status(200).json({success: true});
                // }
            } catch(err) {
                console.log(err);
            }
        });
    }

    update(){
        this.app.put('/api/item/image/update/:id', async(req, res) => {
            try {
                // collect all the data that comes in req.body (REQUEST HAS NO DATA IN ITS BODY)
                const { id }    = req.params;
                const { image } = req.body;

                // validation
                if(!id && !image){
                    throw new Error("There are missing fields!");
                }

                // building query
                const SQL  = `UPDATE bidwars101.Item_Images SET image = ${image} WHERE id = ${id}`;

                // getting result
                const result = await Db.queryPromise(this.con, SQL);

                res.status(200).json({success: true});
            } catch(err) {
                console.log(err);
            }
        });
    }

    read(){
        this.app.get('/api/item/image/:itemId', async(req, res) => {
            try {
                // collect all the data that comes in req.body (REQUEST HAS NO DATA IN ITS BODY)
                const { itemId }    = req.params;

                // validation
                if(!itemId){
                    throw new Error("There are missing fields!");
                }

                // building query
                const SQL  = `SELECT id, image_blob FROM bidwars101.Item_Images WHERE item_id = ${itemId} LIMIT 3`;

                // getting result
                const result = await Db.queryPromise(this.con, SQL);

                if(result.length > 0){
                    res.status(200).json({success: true, data: result});
                }
                else{
                    res.status(200).json({success: false, data: null});
                }
            } catch(err) {
                console.log(err);
            }
        });
    }
}