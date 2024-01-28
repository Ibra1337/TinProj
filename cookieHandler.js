const cokieParser = require('cookie-parser');
const dbHandler = require('./dbHndler');
const jwt = require('jsonwebtoken');
const fs = require('fs');


let secretKey = fs.readFileSync('./theBestSecuredPrivateKeyEver.txt', 'utf8');

const decodeJWT = (token) =>
{
    return jwt.verify(token , secretKey);
}

const replaceLastElement = (inputString, newElement) => {
    if (inputString.length === 0) {
      return inputString; // Handle empty string case
    }
  
    // Use slice to get all characters except the last one, then concatenate the new element
    const updatedString = inputString.slice(0, -1) + newElement;
  
    return updatedString;
  }


const generateRecorStatement = ( key , value , uid ) =>
{
    return `( ${key} , ${value} , ${uid} )`;
}

const generateProdInCartStatement = (cart , uid ) =>
{   
    let sql = "INSERT INTO prodInCart ( product_prodId , amount,  cart_Users_userId) VALUES ";
    for(pid in cart )
    {
        sql += generateRecorStatement(pid , cart[pid] , uid) + ',';
    }
    
    sql = replaceLastElement(sql , ';')
    console.log('sql: ' ,  sql);
    return sql;

}

class CookieHandler {
    constructor(db)
    {
        this.db = db;
    }

    checkJWT = async (token) => {
        const userData = decodeJWT(token);
        const usr = userData.user;
        console.log("Cookie Handler: " , usr );


        const rows = await dbHandler.getRows(db,
            'SELECT * FROM users where username = ? and password = ?',
            [usr.username, usr.password]
        );
        console.log(rows)
        const res = rows[0];
        console.log('res ' , res);

        return res;

    }
    
    sqlFromCookie = async (uid , cartCookie ) => {
        console.log('in sql cookie: ' , uid);
        const rows = await dbHandler.getRows(db ,
            'select * from cart where ( Users_userId ) = ( ? )' ,
            [uid] );
        const containsCart = rows[0];
        console.log('cont cart: ' , containsCart);
        if (!containsCart)
        {
            const tmp = await dbHandler.runStatement(db,
                'INSERT INTO cart ( Users_userId ) VALUES ( ? )',
                [uid]
            );
            console.log('tmp ' , tmp)
        }
        return generateProdInCartStatement(cartCookie , uid);
    
    }

}


module.exports = {

    CookieHandler ,
    replaceLastElement

}
;