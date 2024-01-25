const dbHandelr = require('../dbHndler');
const e = require('express');


class RegisterController { 

    constructor(db)
    {
        this.db = db;

    }
    
    get = (req, res) => {
        res.render('register');
        
    }

    post = async (req, res) => {
        try {
            
            const { name, email, password } = req.body;
    
            let val = true;
    
            let msg = {
                name: "",
                email: "",
                password: ""
            };
    
            console.log(req.body);

    
            console.log(name);
    
            let userNameExists = await dbHandelr.containsUsername(db, name);
            console.log(userNameExists);
            if (userNameExists) {
                val = false;
                msg.name = 'Given name is already taken, try something else';
                console.log('Such user already exists');
            }
    
            let emailExists = await dbHandelr.containsEmail(db , email );

            if (emailExists) {
                val = false;
                msg.email = 'Given email is already taken, try something else';
                console.log('Such email already exists');
            }
    
            if (val) {
                console.log(`User: ${name}`);
                await dbHandelr.insertUser(db, name, email, password);
                res.redirect('/login');
            } else {
                res.render('register', { msg });
            }
        } catch (error) {
            console.error(error.message);
            res.status(500).send('Internal Server Error');
        }
    };
}


module.exports = {
    RegisterController
}