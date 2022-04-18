const express = require('express');
const pool = require('../../Model/db_connect');

const loginRouter = express.Router();


// loginRouter.get('/', async (req, res) => {
//     res.send("login");
// });

loginRouter.post('/', async (req, res) => {
    try {
        const { user, email, pass } = req.body;
        const users = await pool.query("SELECT user_password FROM users WHERE username=$1 OR user_email=$2", [user, email]);
        if(users.rows[0].user_password === pass){
            res.json({"message": "success"});
        }
        else {
            res.json({"message": "failed"});
        }
        
    } catch (err) {
        console.error(err.message);
    }
  
});

module.exports = loginRouter;