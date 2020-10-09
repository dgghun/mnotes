var pkjson = require('../package.json')
const app_name = pkjson.name

//Return landing page
exports.get_landing = (req, res, next) =>{
    res.render('index',{title: app_name});
};
exports.get_landing_err = (req, res, next) =>{
    console.error('404 error for ' + req.originalUrl)
    res.render('index',{title: app_name});
};


