const fs = require('fs');
const dbHandelr = require('../dbHndler');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const cookieHandler = require('../cookieHandler');
const { type } = require('os');
const { use } = require('express/lib/router');
const { pid } = require('process');

let secretKey = fs.readFileSync('./theBestSecuredPrivateKeyEver.txt', 'utf8');

const genTopbar = (req) =>
{
    let decoded = undefined;
    let tc = req.cookies.TC;
    console.log(tc);
    if(tc){
        try{
            decoded = jwt.verify(tc, secretKey ) 
            console.log(decoded);
        }catch(e)
        {
            console.error(e);
        }
    }
    return decoded
}

const groupByOrderId = (items) => {
    const groupedOrders = {};

    items.forEach(item => {
        const orderId = item.orderID;

        if (!groupedOrders[orderId]) {
            groupedOrders[orderId] = [];
        }

        groupedOrders[orderId].push(item);
    });

    return Object.values(groupedOrders);
}

class ItemListController
{
    constructor(db){
        console.log('Item Contoller Created')
        this.db = db;
        this.cookieHandler = new cookieHandler.CookieHandler(db);
    }
    get = async(req,res) => {
        let top = {};
        console.log('acces')
        let items = await dbHandelr.getAllProducts(this.db)
        console.log(items)
        let usr = genTopbar(req);
        if (!usr)
        {
            top = {
                '/login':'Log In' ,
                '/cart': 'My Cart'
            }
        }else{
            top={
                '/myAccount': 'My Account' ,
                '/logOff': "Log Off",
                '/cart': 'My Cart'
            }

        }

        console.log("top: ", top);
        console.log('USR: ' , usr);
        res.render('itemList' , {items , top} );
    }

    get_details = async(req , res ) => {
        const prodid = req.params.productId;
        console.log(prodid)
        let descriptions = await dbHandelr.getProdDescription(db , prodid);
        console.log(descriptions)
        res.render('itemDetails' , {prodid , descriptions})
    }


    getCart = async(req , res ) =>
    {
        const cartCookie = req.cookies.gamersCart;
        let dispCart = new Array();
        if(cartCookie === 'init' || !cartCookie )
        {
            console.log('empty cart cookie')
            res.render('cartGuest' , {dispCart} ) ;
            return
        }
        const cart =  JSON.parse(cartCookie);
        let user = undefined;
        if (req.cookies.TC)
        {
            user =  await this.cookieHandler.checkJWT(req.cookies.TC);
        }
        console.log('cart: ' ,  cartCookie);
        

        if (user && cartCookie )
        {
            const sql = await this.cookieHandler.sqlFromCookie(user.userId , cart);
            dbHandelr.runStatement(this.db , 'DELETE FROM prodInCart WHERE cart_Users_userId = ?' , [user.userId]);
            dbHandelr.sqlStatementExec(this.db , sql);
            
        }
        let tmp ='select * from product where '
        for (let pid in cart)
        {
            tmp += `prodId=${pid} or `
        }
        tmp = tmp.slice(0,-3)
        console.log(tmp)
        dispCart = await dbHandelr.getRows(this.db , tmp,[]);
        let sum = 0;
        for(let row in dispCart)
        {
            dispCart[row].amount = cart[dispCart[row].prodId];
            sum += dispCart[row].amount * dispCart[row].price;
        }
        sum = sum.toFixed(2)
        console.log(dispCart)
        console.log(sum);
        if (user)
        {
            res.render('cartUser' , {dispCart , sum} );
        }else 
        {
            res.render('cartGuest' , {dispCart , sum});
        }
    }


    myAccount = async (req , res ) =>{
        const user = await this.cookieHandler.checkJWT(req.cookies.TC);
        
        const orders = await dbHandelr.getRows(this.db ,
            `SELECT
            "order".orderID,
            "order".Users_userId,
            orderProd.amount,
            orderProd.product_prodId,
            product.name,
            product.shortDesc,
            product.price
        FROM
            "order"
        JOIN
            orderProd ON "order".orderID = orderProd.order_orderID
        JOIN
            product ON orderProd.product_prodId = product.prodId
        WHERE
            "order".Users_userId = ? ;
        ` , [user.userId]);
        console.log(orders);

        res.render('orders');
    }

    buy =async (req , res) =>
    {
        const user = await this.cookieHandler.checkJWT(req.cookies.TC);
        const rows = await dbHandelr.getRows(this.db , 'select * FROM prodInCart WHERE cart_Users_userId = ?' , [user.userId]);
        const log = await dbHandelr.runStatement(this.db , 'DELETE FROM prodInCart WHERE cart_Users_userId = ?' , [user.userId]);
        const last = await dbHandelr.getRows(this.db , `SELECT orderID FROM "order" ORDER BY orderID DESC LIMIT 1;` , [])

        let newId = last[0].orderID +1 ;
        //delete cookie

        const insert = await dbHandelr.runStatement(this.db ,'INSERT INTO "order" ( orderID, Users_userId) VALUES (? , ? ) ' , [newId , user.userId] );
        
            console.log('lasId : ' , newId);
            console.log('rows: ' , rows);
        let sql = `INSERT INTO orderProd ( amount, order_orderID, product_prodId)
        VALUES`;
        for (let row of rows)
        {
            console.log(row);
            sql+=`( ${row.amount} , ${newId} , ${row.product_prodId} ) ,`
        }
        sql = cookieHandler.replaceLastElement(sql , ';')

        console.log(sql)
        
        dbHandelr.runStatement(this.db , sql, []);

        res.render('buy');
    }

    logOff = async (req , res ) =>
    {
        const cartCookie = req.cookies.gamersCart;
        if (cartCookie !== 'init' && cartCookie !== undefined)
        {
        const cart =  JSON.parse(cartCookie);
        const user =  await this.cookieHandler.checkJWT(req.cookies.TC);
        const sql = await this.cookieHandler.sqlFromCookie(user.userId , cart);
        dbHandelr.runStatement(this.db , 'DELETE FROM prodInCart WHERE cart_Users_userId = ?' , [user.userId]);
        dbHandelr.sqlStatementExec(this.db , sql);
        }

    res.cookie('TC', '', { expires: new Date(1), path: '/' });


    res.cookie('gamersCart', '', { expires: new Date(1), path: '/' });


        res.redirect('/')
        
    }

    orders = async (req , res ) =>
    {
        console.log('orders ')

        const user = await this.cookieHandler.checkJWT(req.cookies.TC);
        const rows = await dbHandelr.getRows(this.db , 
            `SELECT
            "order".orderID,
            "order".Users_userId,
            Users.username,
            Users.email,
            orderProd.amount,
            product.*
        FROM
            "order"
        JOIN
            Users ON "order".Users_userId = Users.userId
        JOIN
            orderProd ON "order".orderID = orderProd.order_orderID
        JOIN
            product ON orderProd.product_prodId = product.prodId
        WHERE
            "order".Users_userId = ? ;
        ` , [user.userId] );
    
        let records = groupByOrderId(rows);

        console.log("===================rows: " , records) ;
        

        let sums =[];
        for (let row of records )
        {
            let sum=0;
                for (let rec of row )
                {
                    sum += rec.amount * rec.price;
                }
            sums.push(sum);
        }
        console.log(records.length)
        console.log(sums);
        res.render('orders' , {records , sums });
    }
}

module.exports = {
    ItemListController
}   

