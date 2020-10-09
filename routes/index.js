var express = require('express');
var router = express.Router();

/* GET home page. */
let landing = require("../controllers/landing")
router.get("/", landing.get_landing);



//DGG test error page
router.get('/err', function(req, res, next) {
  res.render('error', { 
    message: 'Express Error Page',
    error:  {status: 'status test', stack: 'stack test'}
  });
});

module.exports = router;
