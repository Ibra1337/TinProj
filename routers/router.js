const express = require('express');
const controllers = require('../controllers')

class Router {
    constructor(db)
    {
        console.log('Router Created')
    this.db = db;
        this.router = express.Router();
        
        const itemControler = new controllers.itemListController.ItemListController(db);
        const loginController = new controllers.loginController.LoginController(db);
        const registerController = new controllers.registerController.RegisterController(db);

        this.router.get('/' , itemControler.get );
        
        this.router.get('/details/prodid=:productId', itemControler.get_details);

        this.router.post('/addToCart' , itemControler.post_addToCart );
        
        this.router.get('/login' , loginController.get );
        this.router.post('/login' , loginController.post );

        this.router.get('/register' , registerController.get )
        this.router.post('/register' , registerController.post );
    }

    getDb(){
        return this.db;
    }

    getRouter(){
        return this.router
    }
    

}


module.exports = {
    Router
};
