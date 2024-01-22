const express = require('express');
const itemListController = require('../controllers/itemListController');


class Router {
    constructor(db)
    {
        console.log('Router Created')
        this.db = db;
        this.router = express.Router();
        const itemControler = new itemListController.ItemListController(db);

        this.router.get('/' , itemControler.get );


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
