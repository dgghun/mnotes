/**
 * File: database_controller.js
 * Type: Controller
 * Description: Handles database connection and CRUD operations.
 */
const { rejects } = require('assert');
const { resolve } = require('path');
var path = require('path');
var sqlite3 = require('sqlite3').verbose(); 

/**
 * Connect to sqlite db and returns db
 * @param {*} dbName 
 */
exports.connectToDb = (dbName) => {
    return new Promise((resolve, reject) => {

        const db = new sqlite3.Database(dbName, err => {
            if (err){
                console.error(err)
                console.error(err.message);
                console.error("Could not connect to db: '" + dbName + "'");
                reject (err)
                return 
            }
            
            console.log("Successful connection to db: '" + dbName + "'");
            resolve(db)
            return
        });
    }); //promise end
}

exports.dropTable = (db,table) => {
    return new Promise((resolve,reject) => {
        var querystr = `DROP TABLE IF EXISTS ` + table
        db.run(querystr, err => {
            if (err) {
                console.error(err.message);
                console.error("Could not drop table: " + table)
                reject(err)
                return
            }
            console.log("Successful dropped table: " + table);
            resolve(db)
            return
          });

    }); // promise end
}