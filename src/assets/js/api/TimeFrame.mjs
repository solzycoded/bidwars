import { Db } from "./database.mjs"

export class TimeFrameApi {
    constructor(app, con){
        this.app = app;
        this.con = con;
    }

    initialize(){
        this.read();
    }

    read(){
        // PUT API
        this.app.get('/api/time-frames', async(req, res) => {
            try {
                const SQL    = "SELECT * FROM bidwars101.Time_Frames";

                // getting result
                const result = await Db.queryPromise(this.con, SQL);

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