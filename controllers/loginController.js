const fs = require('fs');
const dbHandelr = require('../dbHndler');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const { type } = require('os');

let secretKey = fs.readFileSync('./theBestSecuredPrivateKeyEver.txt', 'utf8');


class LoginController {

    constructor(db )
    {
        this.db = db;
    }

    get = (req, res) => {
        console.log('accessing login page');
        res.render('login');
    }


    post = async (req, res) => {
        
        console.log('post_login');
        console.log(req.body);
        const { name: username, password , rememberMe } = req.body;
        const userdto = { name: username, password: password };
    
    
        try {
            const foundUser = await dbHandelr.contains(db,
                'SELECT * FROM users where username = ? and password = ?',
                [username, password]
            );
    
            if (foundUser) {
                
                
                console.log(1)
                res.cookie('USR', {usrName: username , maxAge: 1000}, 
                {httpOnly: false });
                    console.log(2)
                
                if(rememberMe)
                {
                    console.log(3)
                const token = jwt.sign({ user: userdto }, secretKey, { expiresIn: '7d' });
                res.cookie('TC', token, { httpOnly: false });
                
                }else{
                    const token = jwt.sign({ user: userdto }, secretKey, { expiresIn: '1h' });
                    res.cookie('TC', token, { httpOnly: false });
                }
                res.redirect('/');
            } else {
                console.log('User not found or incorrect password');
                const msg = {
                    text: 'User not found or incorrect password'
                };
                console.log(msg);
                res.render('login', { msg });
            }
        } catch (err) {
            const msg = {
                text: 'There is a problem with the given credentials'
            };
    
        }
    }   

}

module.exports = {
    LoginController
};
