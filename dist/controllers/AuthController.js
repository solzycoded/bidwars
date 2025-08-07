const signup = (req, res) => {
    const { email, username, password } = req.body;
    if (!email || !username || !password) {
        return res.status(406).json({ success: false, data: { message: "Some Fields are missing" } });
    }
    console.log({ email, username, password });
    // const token = App.token();
    // const role  = "user";
    // const data  = [email, username, password, role, token];
    // bcrypt.hash(password, 10, (err, hash) => {
    //     if (err) {
    //         return res.status(500).json({ success: false, data: { message: err } });
    //     }
    //     data[2] = hash;
    //     user.create(data, (err, result) => {
    //         try{
    //             if(result.insertId==undefined){
    //                 res.status(201).json({ success: false, data: { message: "Username or Email already exists" } });
    //             }
    //             else{
    //                 res.status(201).json({ success: true, data: { token: token, username, role: role, id: result.insertId } });
    //             }
    //         } catch(err) {
    //             return res.status(201).json({ success: false, data: { message: "Username or Email already exists", error: err} });
    //         }
    //     });
    // });
};
export default {
    signup
};
