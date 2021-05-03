var express = require('express');
var router = express.Router();

let landing = require("../controllers/landing_controller")   //Home page
let notes = require("../controllers/notes_controller")    //notes

router.get("/", landing.get_landing);                   // Home page
router.get("/userHome", landing.get_userHome)           // User home page
router.get("/newClient",notes.get_newClient)            // add new client
router.get("/editClient",notes.editClient)              // edit client
router.get("/viewNote*", notes.viewNote)                // View client note

router.post("/userHome", landing.get_userHome)          // User home page
router.post("/createNewClient", notes.createNewClient)  // add new client to db
router.post("/viewClient", notes.viewClient)            // view Client page
router.post("/editClient",notes.editClient)             // edit client
router.post("/updateClient",notes.updateClient)         // update client
router.post("/newNote",notes.newNote)                   //New Note page
router.post("/createNewNote",notes.createNewNote)       //New Note page
router.post("/viewNote", notes.viewNote)                // View client note


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
