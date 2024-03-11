import { Db } from "./database.mjs"

export class SearchApi {
    constructor(app, con){
        this.app = app;
        this.con = con;
    }

    initialize(){
        this.search();
    }

    search(){
        // PUT API
        this.app.post('/api/search', async(req, res) => {
            try {
                // collect all the data that comes in req.body
                const { search, categories } = req.body;

                // building query
                let filterConditions = this.categoryFilter(categories);
                const searchQuery    = categories.concat(["%" + search + "%"]);

                const SQL         = "SELECT title FROM bidwars101.Items " + 
                    "INNER JOIN bidwars101.Categories ON bidwars101.Categories.id=bidwars101.Items.category_id " + 
                    "WHERE " + filterConditions + "title LIKE ?";

                // getting result
                const result      = await Db.queryPromise(this.con, SQL, searchQuery);

                // res.send(result);
                if(result.length > 0){
                    res.status(200).json({success: true, data: result});
                }
                else {
                    res.status(200).json({success: false, data: "No records found!"});
                }
            } catch(err) {
                console.log(err);
                // res.status(500).json({message: "Something went wrong!"});
            }
        });
    }

    categoryFilter(categories){
        let conditions = "";

        for (let i = 0; i < categories.length; i++) {
            conditions += "name = ? AND ";
        }

        return conditions;
    }
}