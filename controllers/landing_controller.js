/**
 * File: landing.js
 * Type: Controller
 * Description: Handles landing page calls
 */

var pkjson = require('../package.json')
const { head } = require('../routes')
//const app_name = pkjson.name
const app_name = "mnotes" 
const header = "Let's write some notes."

/**EXPORT FUNCTIONS */

//Return user home page
exports.get_userHome = (req, res, next) =>{
    var message = req.body.message
    
    if(isNull(message))
        message = header
    
    console.log("-->landing.js:get_userHome: message = " + message)
    console.log(req.session)
    res.render('userHome', getUserHome(message, req));
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

    res.render('index',getLanding());
};


/**LOCAL FUNCTIONS */

function getLanding(){
    var obj = new Object();
    obj.title = app_name;

    var str = JSON.stringify(obj);
    return JSON.parse(str);
    
}

function getUserHome(msg, req){
    var obj = new Object();
    obj.title = app_name;
 
    obj.message = msg;                  // preset default message
    obj.doAlert = false;                // preset to no alert
    
    if(msg == 'login')                  //new login?
        obj.message = "Welcome Back";   //yup, set welcome message

    // client added to db?
    if(msg == 'clientAdded'){
        var newClient = req.body.client;
        obj.message = header;
        obj.doAlert = true;
        obj.pugMsg = 'clientAdded'
        obj.alertMsg = 'Added client ' +  newClient 

    }

    var str = JSON.stringify(obj);
    return JSON.parse(str);
}

function isNull(str){
    if(typeof str === 'undefined' | str === '')
        return true
    return false
}