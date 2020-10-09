var express = require('express');
var router = express.Router();

let landing = require("../controllers/landing")   //Home page


router.get("/", landing.get_landing);             //Home page



//DGG test error page
router.get('/err', function(req, res, next) {
  res.render('error', { 
    message: 'Express Error Page',
    error:  {status: 'status test', stack: 'stack test'}
  });
});

//Catch all MUST BE LAST!
router.get("*",landing.get_landing_err);

module.exports = router;
