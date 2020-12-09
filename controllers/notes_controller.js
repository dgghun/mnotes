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
 exports.viewClient = (req, res, next) => {
    
    console.log(fname + "viewClient(): Userid" + req.body.userid)
    
    //TODO you are here!  
    req.body = ''
    landing.get_userHome(req, res, next)
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

 /**LOCAL FUNCTIONS */
 function getNewClient(msg){
   var obj = new Object();
   obj.title = app_name;

   obj.message = msg;

   var str = JSON.stringify(obj);
   return JSON.parse(str);
}