/**
 * File: notes_controller.js
 * Type: Controller
 * Description: Handles note/client creation and modifications
 */
let landing = require("../controllers/landing_controller")
let database = require("../controllers/database_controller")
const { data } = require("jquery")

const app_name = "mnotes" 
const fname = "-->notes_controller.js:"    // file name for logging

 /**EXPORT FUNCTIONS */

/**
 * Render client page
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.viewClient = (req, res, next) => {
   var funcname = "retrieveClient():"
   var userid = req.body.userid
   console.log(fname + funcname + "Userid = " + userid)
   

   database.retrieveClient(userid)
   .then(client =>{      
      
      if(client){
         var clientName = client.firstName
         var msg = clientName.trim() + '\'s Info'
         console.log(fname + funcname + " retrieved " + clientName)
         
         var obj = new Object();
         obj.title = app_name;
         obj.message = msg;           // preset default message
         obj.doAlert = false;                // preset to no alert
         obj.client = client;                // client info
         
         var str = JSON.stringify(obj);
         res.render('clientHome',JSON.parse(str))
         
      }
      else{
         console.log(fname + funcname + " Userid " + userid + " not found.")
         req.body = {
            message: 'clientNotFoundById',
            clientId: userid,
            errormessage: 'clientNotFoundById'
         }   
         landing.get_userHome(req, res, next)
      }
      
   }).catch(err =>{
      console.log(fname + "retrieveClient():" + err)
      req.body = {
         message: 'clientNotFoundById',
         clientId: userid,
         errormessage: err.message
      }
      landing.get_userHome(req, res, next)
   })

}


 /**
  * Creates new client in database
  * @param {*} req 
  * @param {*} res 
  * @param {*} next 
  */
 exports.createNewClient = (req, res, next) => {
    var fullName = req.body.firstName + " " + req.body.lastName
    
    //Create new client in db
    database.createClient(req.body)
    .then(err => {
      console.log(fname + "createNewClient() added '" + fullName + "'")
      req.body = {
         message: 'clientAdded',
         client: fullName
      }
      
      landing.get_userHome(req, res, next)
   })
   .catch(err => {
      console.log(fname + "createNewClient():" + err)
      req.body = {
         message: 'clientAddedError',
         client: fullName,
         errormessage: err.message
      }
      landing.get_userHome(req, res, next)
   })
   
 }
 
 
/**
 * Add new client page
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.get_newClient = (req, res, next) => {
   var message = req.body.message
   console.log(fname + "get_newClient: message = " + message)
   res.render('newClient', getNewClient('Add New Client'));
}


/**LOCAL FUNCTIONS */
function getNewClient(msg) {
   var obj = new Object();
   obj.title = app_name;

   obj.message = msg;

   var str = JSON.stringify(obj);
   return JSON.parse(str);
}