/**
 * File: database_controller.js
 * Type: Controller
 * Description: Handles database connection and CRUD operations.
 */
const { rejects } = require('assert');
const { table } = require('console');
const { resolve } = require('path');
var path = require('path');
var sqlite3 = require('sqlite3').verbose(); 
const DBNAME = path.join(__dirname,'../data', 'mnotes.db')
const CLNT_TABLE = 'Clients'
const NOTE_TABLE = 'Notes'
const CLNT_INIT = "(" +
                  "ClientId INTEGER PRIMARY KEY AUTOINCREMENT," +
                  "firstName VARCHAR(100) NOT NULL," +
                  "lastName VARCHAR(100) NOT NULL," +
                  "middleName VARCHAR(100)," +
                  "address1 VARCHAR(100)," +
                  "address2 VARCHAR(100)," +
                  "city VARCHAR(100)," +
                  "state VARCHAR(100)," +
                  "zip VARCHAR(100)," +
                  "phone VARCHAR(100)," +
                  "email VARCHAR(100)," +
                  "ethnicity VARCHAR(100)," +
                  "marital_status VARCHAR(100)" +
                  ");";


/**
 * Connect to sqlite db and returns db
 */
exports.getDAO = () => {
    return new Promise((resolve, reject) => {

        const db = new sqlite3.Database(DBNAME, err => {
            if (err){
                console.error(err.message);
                console.error("Could not connect to db: " + DBNAME);
                reject (err)
                return 
            }
            
            console.log("Successful connection to db: " + DBNAME);
            resolve(db)
            return
        });
    }); //promise end
}

exports.initDB = () => {
    this.getDAO().then(db => {
        
        //Do these sequentially 
        db.serialize(function() {
            // For testing, starting with fresh tables
            dropTable(db,CLNT_TABLE);
            dropTable(db,NOTE_TABLE);

            createTable(db, CLNT_TABLE, CLNT_INIT)
            closeDAO(db);
        })
    }).catch(err => console.error(err))
}

function createTable(db,tableName, tableQuery){
    const querystr = "CREATE TABLE IF NOT EXISTS " + 
                     tableName + tableQuery;
    db.run(querystr, err => {
        if (err) {
            console.error(err.message);
            return err
        }
        console.log("Successful creation of the "+ CLNT_TABLE +" table");
    });
}

/**
 * Closes database DAO
 * @param {*} db - database
 */
function closeDAO(db){
    db.close(msg => {
        if(msg == null)
            console.log("Closed db successfully: " + DBNAME)
        else{
            console.error("Error: could not close " + DBNAME)
            console.error(msg)
        }
    })
}


/**
 * Drops a table from db
 * @param {*} db 
 * @param {*} table 
 */
function dropTable(db,table) {
        var querystr = `DROP TABLE IF EXISTS ` + table
        db.run(querystr, err => {
            if (err) {
                console.error(err)
                console.error(err.message);
                console.error("Could not drop table: " + table)
                // reject(err)
                return
            }
            console.log("Successful dropped table: " + table);
            // resolve(db)
            return
          });

}