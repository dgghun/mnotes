var express = require('express');
var router = express.Router();

let landing = require("../controllers/landing_controller")   //Home page
let userHome = require("../controllers/notes_controller")    //notes

router.get("/", landing.get_landing);             //Home page
router.post("/userHome", landing.get_userHome)    // User home page
router.get("/userHome", landing.get_userHome)    // User home page
router.get("/newClient",userHome.get_newClient)


//DGG test error page
router.get('/err', function(req, res, next) {
  res.render('error', { 
    message: 'Express Error Page',
    error:  {status: 'status test', stack: 'stack test'}
  });
});

//Catch all MUST BE LAST!
router.get("*",landing.get_landing_err);
router.post("*",landing.get_landing_err);


module.exports = router;
