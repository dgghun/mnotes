/**
 * File: landing.js
 * Type: Controller
 * Description: Handles landing page calls
 */

var pkjson = require('../package.json')
//const app_name = pkjson.name
const app_name = "mnotes"


/**EXPORT FUNCTIONS */

//Return user home page
exports.get_userHome = (req, res, next) =>{
    res.render('userHome', getUserHome());
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

function getUserHome(){
    var obj = new Object();
    obj.title = app_name;

    var str = JSON.stringify(obj);
    return JSON.parse(str);
}