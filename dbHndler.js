const sql = require('sqlite3').verbose();
const fs = require('fs');




const initDb = ()=>{
    const createStatement = fs.readFileSync('dbScripts/createDb.sql' , 'utf8');

    const insertDataStatement = fs.readFileSync('dbScripts/insert.sql' , 'utf8');
    let db  = new sql.Database("shopDB.db");
//    db.exec(createStatement);
//    db.exec(insertDataStatement);
    return  db;
}

const getAllProducts = async (db) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM product LIMIT 20';

        db.all(sql, [], (err, rows) => {
            if (err) {
                console.error(err.message);
                reject(err);
            } else {

                resolve(rows);
            }
        });
    });
};

const getProdDescription = async(db , prodid ) =>
{
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM description where product_prodid =?';

        db.all(sql, [prodid], (err, rows) => {
            if (err) {
                console.error(err.message);
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
};

const containsUsername = async (db, username) => {
    try {
        
        const rows = await new Promise((resolve, reject) => {
            console.log('before ' , username )
            db.all('SELECT * FROM users WHERE username = ?', [username], (err, rows) => {
                if (err) {
                    console.error(err.message);
                    reject(err);
                } else {
                    console.log('len:', rows.length);
                    resolve(rows);
                }
                console.log('inside')
            });
        });

        const len = rows.length;
        console.log('len:', len);

        const res = len > 0;
        console.log('-----------', res);

        return res;
    } catch (err) {
        console.error(err.message);
        throw new Error('Error checking username existence');
    }
};

const containsEmail = async (db, email ) => {
    try {
        const rows = await new Promise((resolve, reject) => {
            db.all('SELECT * FROM users WHERE email = ?', [email], (err, rows) => {
                if (err) {
                    console.error(err.message);
                    reject(err);
                } else {
                    console.log('len:', rows.length);
                    resolve(rows);
                }
            });
        });

        const len = rows.length;
        console.log('len:', len);

        const res = len > 0;
        console.log('-----------', res);

        return res;
    } catch (err) {
        console.error(err.message);
        throw new Error('Error checking username existence');
    }
};


const insertUser = async (db, username, password , email)  => {
    db.run('INSERT INTO users (username , password, email , role ) VALUES (?, ?, ? , ?)', [username, email, password , 'customer'], function(err) {
        if (err) {
            return console.error(err.message);
        } 
        console.log('User hass been added');
    });
};

const contains = async (db, sql, params) => {
    try {
        const rows = await new Promise((resolve, reject) => {
            db.all(sql, params, (err, rows) => {
                if (err) {
                    console.error(err.message);
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });

        const len = rows.length;
        console.log('len:', len);

        const res = len > 0;
        console.log('-----------', res);

        return res;
    } catch (err) {
        console.error(err.message);
        throw new Error('Error executing database query');
    }
};

db = initDb();
res = getProdDescription(db , 5);
res.then(res => {console.log(res)})




module.exports = {
    initDb , 
    getAllProducts ,
    getProdDescription ,
    containsEmail ,
    insertUser ,
    containsUsername,
    contains
    
}

