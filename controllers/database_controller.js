/**
 * File: database_controller.js
 * Type: Controller
 * Description: Handles database connection and CRUD operations.
 */
const { rejects } = require('assert');
const { table } = require('console');
const { resolve } = require('path');
var path = require('path');
var moment = require('moment')
var sqlite3 = require('sqlite3').verbose(); 
var fname = "-->database_controller.js:"
const DBNAME = path.join(__dirname,'../data', 'mnotes.db')
const CLNT_TABLE = 'Clients'
const NOTE_TABLE = 'Notes'
const CLNT_ROW = "firstName,lastName,middleName,address1,address2,city,state,zip,phone,email,ethnicity,maritalStatus,dob,dt_created,dt_updated"
const CLNT_INIT = "(" +
                  "id INTEGER PRIMARY KEY AUTOINCREMENT," +
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
                  "maritalStatus VARCHAR(100)," +
                  "dob TEXT," +
                  "dt_created TEXT," +
                  "dt_updated TEXT" +
                  ");";
const CLNT_UPDATE = "firstName = ?, " +
                    "lastName = ?, " +
                    "middleName = ?, " +
                    "address1 = ?, " +
                    "address2 = ?, " +
                    "city = ?, " +
                    "state = ?, " +
                    "zip = ?, " +
                    "phone = ?, " +
                    "email = ?, " +
                    "ethnicity = ?, " +
                    "maritalStatus = ?, " +
                    "dob = ?, " +
                    "dt_updated = ?" 

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

/**
 * Initialize the database on startup (make sure things are working)
 */
exports.initDB = () => {
    this.getDAO().then(db => {
        
        //Do these sequentially 
        db.serialize(function() {
            // For testing
            // dropTable(db,CLNT_TABLE);
            // dropTable(db,NOTE_TABLE);

            createTable(db, CLNT_TABLE, CLNT_INIT)
            closeDAO(db);
        })
    }).catch(err => console.error(err))
}


/**
 * Update client 
 * @param {*} client 
 */
exports.updateClient = (client) => {
    var funcname = 'updateClient():'
    var userid = client.id
    console.log(fname + funcname + 'Updating client with userid = ' + userid)
    const querystr = "UPDATE " + CLNT_TABLE + " SET " + CLNT_UPDATE + " WHERE id = ?"

    var clientValues = [];
    for (var key in client) {
        if (key != 'id')         //skip id for now
            clientValues.push(client[key])
    }

    var curDateTime = getDateTime()
    clientValues.push(curDateTime)    //add date updated
    clientValues.push(userid)         //set id

    return new Promise((resolve, reject) => {
        this.getDAO().then(db => {
            //Do this seqeutially 
            db.serialize(function () {
                //Create client in db
                db.run(querystr, clientValues, err => {
                    if (err) {
                        console.log(fname + funcname + err.message)
                        console.log(fname + funcname + err)
                        reject(err)
                    } else {
                        console.log(fname + funcname + "Client updated successfully")
                        resolve(err)
                    }
                })
                closeDAO(db);
            })
        }).catch(err => {
            console.error(err)
            console.error(err.message)
            return err
        })
    })
}


/**
 * Retrieves a single Client by id
 * @param {*} userid - Client id
 */
exports.retrieveClient = (userid) => {
    var funcname = "retrieveClient():"
    console.log(fname + "retrieveClient(): Getting client with userid = " + userid)
    const querystr = "SELECT * FROM " + CLNT_TABLE + " WHERE id = ?"

    return new Promise((resolve, reject) => {
        this.getDAO().then(db => {
            //Do this sequentially 
            db.serialize(function (){
                db.get(querystr, userid, (err, row) => {
                    
                    if (err) {
                        console.log(fname + "retrieveClient():" + err.message)
                        console.log(fname + "retrieveClient():" + err)
                        reject(err)
                        return
                    }
                    if(row){
                        console.log(fname + "retrieveClient(): retrieved userid (" + userid + ") successfully")
                    }else{
                        console.log(fname + funcname + " Userid " + userid + " not found")
                    }
                    resolve(row)
                    return
                })
            })
            closeDAO(db);
        }).catch(err => {
            console.error(err)
            console.error(err.message)
            return err
        })
    })
}

/**
 * Retrieve Clients
 */
exports.retrieveClients = () => {
    const querystr = "SELECT * FROM " + CLNT_TABLE;
    return new Promise((resolve, reject) => {

        this.getDAO().then(db => {
            //Do this sequentially
            db.serialize(function () {
                db.all(querystr, [], (err, rows) => {
                    if (err) {
                        console.log(fname + "retrieveClients():" + err.message)
                        console.log(fname + "retrieveClients():" + err)
                        reject(err)
                        return
                    }
                    console.log(fname + "retrieveClients(): Clients retrieved successfully")
                    
                    // Modify date before sending
                    for(var key in rows){
                        var dateTime = rows[key].dt_updated
                        rows[key].dt_updated = moment(dateTime).format('MM/DD/YYYY hh:mm a')
                    }
                    
                    resolve(rows)
                    return
                })
                closeDAO(db);
            })
        }).catch(err => {
            console.error(err)
            console.error(err.message)
            return err
        })
    })
}


/**
 * Adds a Client to db
 * @param {*} newClient - new client to add to db
 */
exports.createClient = (newClient) => {
    
    console.log(fname + "createClient(): creating client ")
    var clientValues = [];
    for(var key in newClient){
        clientValues.push(newClient[key])
    }
        
    var curDateTime = getDateTime()
    clientValues.push(curDateTime)    //add created date
    clientValues.push(curDateTime)    //add created date
    var querystr = "INSERT INTO " + CLNT_TABLE + 
    "(" + CLNT_ROW + ")" +
    " VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);"
    
    return new Promise((resolve,reject) => {
        this.getDAO().then(db => {
            //Do this seqeutially 
            db.serialize(function(){
                //Create client in db
                db.run(querystr, clientValues, err =>{
                if(err){
                        console.log(fname + "createClient():" + err.message)
                        console.log(fname + "createClient():" + err)
                        reject(err)
                    } else{
                        console.log(fname + "createClient(): Client added successfully")
                        resolve(err)
                    }
                })
                closeDAO(db);
            })
        }).catch(err => {
            console.error(err)
            console.error(err.message)
            return err 
        })
    })    
}


/**
 * get formatted date and time
 */
function getDateTime(){
    return moment().format()
}

/**
 * Returns formatted current date 
 */
function getDate(){
    var today = new Date()
    var dd = today.getDate()
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear()

    if(dd < 10)
        dd = '0' + dd
    if(mm < 10)
        mm = '0' + mm

    return yyyy + "-" + mm + "-" + dd
}

/**
 * Returns formatted current time 
 */
function getTime(){
    var today = new Date()
    var hr = today.getHours()
    var mn = today.getMinutes()
    var secs = today.getSeconds()

    return hr + ":" + mn + ":" + secs
}

/**
 * create a table in db
 * @param {*} db - SQLite db
 * @param {*} tableName - table name
 * @param {*} tableQuery  - SQLite query string
 */
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
            console.log("Successfully dropped table: " + table);
            // resolve(db)
            return
          });

}