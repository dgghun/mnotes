/**
 * File: landing_controller.js
 * Type: Controller
 * Description: Handles landing page calls
 */

var pkjson = require('../package.json')
const { head } = require('../routes')
let database = require("../controllers/database_controller")
//const app_name = pkjson.name
const app_name = "mnotes" 
const header = "Let's write some notes."
const fname = "-->landing_controller.js:"

/**EXPORT FUNCTIONS */

//Return user home page
exports.get_userHome = (req, res, next) => {
    var message = req.body.message

    if (isNull(message))
        message = header

    console.log(fname + "get_userHome: message = " + message)

    //Retrieve list of clients from db to display on user landing page
    database.retrieveClients().then(clients => {
        res.render('userHome', getUserHome(message, req, clients));
    }).catch(err => {
        console.log(err)
        var clients = null
        res.render('userHome', getUserHome(message, req, clients));
    })
}

//Return landing page
exports.get_landing = (req, res, next) =>{
    res.render('index', getLanding());
};

//Return landing page due to 404
exports.get_landing_err = (req, res, next) =>{
    urlReq = req.originalUrl
    urlMeth = req.method
    
    var errMsg = '-->get_landing_err: No route for ' + urlMeth + ' ' + urlReq
    console.error(errMsg);

    res.render('index',getLanding(errMsg));
};


/**LOCAL FUNCTIONS */

function getLanding(msg){
    var obj = new Object();
    obj.title = app_name;
    obj.doAlert = false;
    obj.pugMsg = ''

    if(msg){
        obj.doAlert = true
        obj.pugMsg = 'routeError'
        obj.alertMsg = msg
    }

    var str = JSON.stringify(obj);
    return JSON.parse(str);
    
}

function getUserHome(msg, req, clnts){
    var obj = new Object();
    obj.title = app_name;
 
    obj.message = msg;                  // preset default message
    obj.doAlert = false;                // preset to no alert
    obj.clients = clnts;                // list of clients
 
    if(msg == 'login')                  //new login?
    obj.message = "Welcome Back";   //yup, set welcome message
    
    // client added to db?
    if(msg == 'clientAdded'){
        var newClient = req.body.client;
        obj.message = header;
        obj.doAlert = true;
        obj.pugMsg = 'clientAdded'
        obj.alertMsg = 'Added client ' +  newClient 
        
    }else if(msg == 'clientAddedError'){
        var newClient = req.body.client;
        obj.message = header;
        obj.doAlert = true;
        obj.pugMsg = 'clientAddedError'
        obj.alertMsg = 'Client not added: ' +  newClient 
        obj.errorMsg = req.body.errormessage
    }else if(msg == 'clientNotFoundById'){
        var clientId = req.body.clientId
        obj.message = header;
        obj.doAlert = true;
        obj.pugMsg = 'clientNotFoundById'
        obj.alertMsg = 'Client ID not found: ' + clientId 
        obj.errorMsg = req.body.errormessage
    }
    
    var str = JSON.stringify(obj);
    return JSON.parse(str);
}

function isNull(str){
    if(typeof str === 'undefined' | str === '')
    return true
    return false
}