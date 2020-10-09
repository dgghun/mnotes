/**
 * File: landing.js
 * Type: Controller
 * Description: Handles landing page calls
 */

var pkjson = require('../package.json')
const app_name = pkjson.name


/**EXPORT FUNCTIONS */

//Return landing page
exports.get_landing = (req, res, next) =>{
    res.render('index', getLanding());
};

//Return landing page due to 404
exports.get_landing_err = (req, res, next) =>{
    urlReq = req.originalUrl

    if(urlReq == "/favicon.ico" || urlReq == "favicon.ico")
        console.log('-->get_landing_err: request for ' + urlReq);
    else
        console.error('-->get_landing_err: Path not found ' + urlReq);

    res.render('index',getLanding());
};


/**LOCAL FUNCTIONS */

function getLanding(){
    var obj = new Object();
    obj.title = app_name;

    var str = JSON.stringify(obj);
    return JSON.parse(str);
    
}

