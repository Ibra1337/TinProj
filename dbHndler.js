const sql = require('sqlite3').verbose();
const fs = require('fs');


const createStatement = fs.readFileSync('dbScripts/createDb.sql' , 'utf8');

const insertDataStatement = fs.readFileSync('dbScripts/insert.sql' , 'utf8');

const initDb = ()=>{
    return new sql.Database("shopDB.db")
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


module.exports = {
    initDb , 
    getAllProducts
}

