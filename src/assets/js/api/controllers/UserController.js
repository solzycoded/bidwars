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

async function loginUser(req, res) {
    const { username, password } = req.body;

    const data  = [username];

    user.login(data, (err, results) => {
        if(err || results.length == 0){
            return res.status(201).json({ success: false, data: { message: "The Credentials you provided are invalid!" } });
        }

        const user = results[0];

        bcrypt.compare(password, user.password, (err, result) => {
            if (result) {
                const token = App.token();
                res.status(200).json({ success: true, data: { token: token, username: user.name, role: user.role, id: user.id }});
            } else {
                res.status(201).json({ success: false, data: { message: "The Credentials you provided are invalid!" } });
            }
        });
    });
}

async function createUserToken(req, res) {
    const { id, token } = req.body;

    const data  = [token, id];
 
    user.createToken(data, (err, results) => {
        res.status(201).json({ success: true });
    });
}

async function createUser(req, res) {
    const { email, username, password } = req.body;

    if(!email || !username || !password){
        return res.status(406).json({ success: false, data: { message: "Some Fields are missing" } });
    }

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
                if(result.insertId==undefined){
                    res.status(201).json({ success: false, data: { message: "Username or Email already exists" } });
                }
                else{
                    res.status(201).json({ success: true, data: { token: token, username, role: role, id: result.insertId } });
                }
            } catch(err) {
                return res.status(201).json({ success: false, data: { message: "Username or Email already exists", error: err} });
            }
        });
    });
}
 
function itemsBidOn(req, res) {
    const userId = req.params;

    if(!userId){
        return res.status(406).json({ success: false, data: { message: "Some Fields are missing" } });
    }

    const data = [userId];

    user.bidItems(data, (err, result) => {
        try{
            if(result!=undefined && result.length > 0){
                res.status(200).json({ success: true, data: result });
            }
            else{
                res.status(200).json({ success: false, data: [] });
            }
        } catch(err) {
            return res.status(500).json({ success: false, data: { message: "Something went wrong", error: err } });
        }
    });
}

const UserController = {
    itemsBidOn,
    getAllUsers,
    createUser,
    injectDB,
    loginUser,
    createUserToken
};

export default UserController;