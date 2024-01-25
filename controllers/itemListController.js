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

    get_details = async(req , res ) => {
        const prodid = req.params.productId;
        console.log(prodid)
        let descriptions = await dbHandelr.getProdDescription(db , prodid);
        console.log(descriptions)
        res.render('itemDetails' , {descriptions})
    }

    post_addToCart = async(req , res ) => 
    {
        const prodid = req.body.productId ;  
        console.log("to cart has been added: " , prodid);

        res.redirect('/');
    }
}

module.exports = {
    ItemListController
}   

