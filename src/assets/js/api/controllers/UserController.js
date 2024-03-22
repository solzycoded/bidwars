// controllers/userController.js
import User from '../models/User.js';
import { App } from '../util.js';
import bcrypt from 'bcrypt';

let db;
let user;

function injectDB(database) {
    db = database;

    user = new User(db);
}

function getAllUsers(req, res) {
    user.all((err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.status(200).json(results);
    });
}

async function createUser(req, res) {
    const { email, username, password } = req.body;

    const token = App.token();
    const role  = "user";
    const data  = [email, username, password, role, token];

    bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
            return res.status(500).json({ success: false, data: { message: err } });
        }

        data[2] = hash;

        user.create(data, (err, result) => {
            try{
                // if (err) {
                //     res.status(500).json({ error: err.message });
                //     return;
                // }

                if(result.insertId==undefined){
                    res.status(201).json({ success: false, data: { message: "Username or Email already exists" } });
                }
                else{
                    res.status(201).json({ success: true, data: { token: token, username, role: role, id: result.insertId } });
                }
            } catch(err) {
                res.status(201).json({ success: false, data: { message: "Username or Email already exists" } });
                // console.log(err);
            }
        });
    });
}

const UserController = {
    getAllUsers,
    createUser,
    injectDB
};

export default UserController;