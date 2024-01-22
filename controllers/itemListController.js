const fs = require('fs');
const dbHandelr = require('../dbHndler');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const { type } = require('os');

class ItemListController
{
    constructor(db){
        console.log('Item Contoller Created')
        this.db = db;
    }
    get = async(req,res) => {
        console.log('acces')
        let items = await dbHandelr.getAllProducts(this.db)
        console.log(items)
        
        res.render('itemList' , {items} );
    }


}
module.exports = {
    ItemListController
}   

