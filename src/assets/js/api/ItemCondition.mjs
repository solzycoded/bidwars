import { Db } from "./database.mjs"

export class ItemConditionApi {
    constructor(app, con){
        this.app = app;
        this.con = con;
    }

    initialize(){
        this.read();
    }

    read(){
        // PUT API
        this.app.get('/api/item-conditions/:type', async(req, res) => {
            try {
                const { type } = req.params;

                if(!type){
                    return res.status(200).json({success: false, data: [], message: "Condition type is missing!"});
                }

                const condition = type=="pre" ? true : false;
                const value     = [condition];

                const SQL    = "SELECT * FROM bidwars101.Item_Conditions " + 
                    "WHERE pre_condition = ?";

                // getting result
                const result = await Db.queryPromise(this.con, SQL, value);

                if(result.length > 0){
                    res.status(200).json({success: true, data: result});
                }
                else {
                    res.status(200).json({success: false, data: []});
                }
            } catch(err) {
                console.log(err);
            }
        });
    }
}