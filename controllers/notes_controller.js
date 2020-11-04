/**
 * File: notes.js
 * Type: Controller
 * Description: Handles note/client creation and modifications
 */
const app_name = "mnotes" 
const fname = "-->notes.js:"    // file name for logging

 /**EXPORT FUNCTIONS */
 exports.get_newClient = (req, res, next) => {
    var message = req.body.message
    console.log(fname + "get_newClient: message = " + message)
    res.render('newClient', getNewClient('Add New Client'));
 }

 /**LOCAL FUNCTIONS */
 function getNewClient(msg){
   var obj = new Object();
   obj.title = app_name;

   obj.message = msg;

   var str = JSON.stringify(obj);
   return JSON.parse(str);
}