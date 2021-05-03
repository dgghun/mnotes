/**
 * File: notes_controller.js
 * Type: Controller
 * Description: Handles note/client creation and modifications
 */
let landing = require("../controllers/landing_controller")
let database = require("../controllers/database_controller")
const icd10_data = require('../data/ICD10-Codes.json')  //icd10 diagnosis codes 
const { data } = require("jquery")

const app_name = "mnotes" 
const fname = "-->notes_controller.js:"    // file name for logging
const NOTEADDED = "noteAdded"

 /**EXPORT FUNCTIONS */

 /**
  *  Create a new client note
  * @param {*} req 
  * @param {*} res 
  * @param {*} next 
  */
exports.createNewNote = (req, res, next) => {
   var funcname = fname + 'createNewNote():'
   var clientid = req.body.clientid
   console.log(funcname + 'client id = ' + clientid)
   
   database.createNote(req.body)
   .then(err => {
      console.log(funcname + "note added for id = " + clientid)
      req.body = {
         userid: clientid,
         doAlert: true,
         pugMsg: NOTEADDED,
         alertMsg: 'Note Added Successfully!'
      }
      this.viewClient(req, res, next)
   })
   .catch(err => {
      console.log(funcname + err)
      req.body = {
         userid: clientid,
         doAlert: true,
         pugMsg: 'noteAddedError',
         alertMsg: 'Error Adding Note.',
         errorMsg: err.message
      }
      this.viewClient(req, res, next)
   })
   
}

/**
 * View a Client note
 * @param {*} req -  GET request 
 * @param {*} res 
 * @param {*} next 
 */
exports.viewNote = (req, res, next) =>{
   var funcname = fname + 'viewNote():'
   var noteId = req.query.noteId          //GET request query
   var clientId = req.query.clientId      //GET request query
   console.log(funcname + "noteId: " + noteId + ', clientId: ' + clientId)

   //FOR TESTING
   req.body = {userid: clientId}
   this.viewClient(req, res, next)
}


/**
 * Load new note page
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.newNote = (req, res, next) => {
   var funcname = 'newNote():'
   var userid = req.body.userid
   console.log(fname + funcname + "Userid = " + userid)
   
   database.retrieveClient(userid)
   .then(client => {
      if (client) {
         var obj = new Object();
         obj.message = 'Create New Note';           // preset default message
         obj.firstName = client.firstName;                // client info
         obj.lastName = client.lastName
         obj.id = client.id
         obj.icd10Data = icd10_data                //icd10 diagnosis codes
         
         var str = JSON.stringify(obj);
         res.render('newNote', JSON.parse(str))
      }
      else {
         console.log(fname + funcname + " Userid " + userid + " not found.")
         req.body = {
            userid: userid,
            doAlert: true,
            pugMsg: 'clientNotFoundById',
            alertMsg: 'Client not found: (id:' + userid + ')',
            errorMsg: err.message
         }

         this.viewClient(req, res, next)
      }
   }).catch(err => {
      console.log(fname + funcname + err)
      req.body = {
         userid: userid,
         doAlert: true,
         pugMsg: 'clientNotFoundById',
         alertMsg: 'Client not found: (id:' + userid + ')',
         errorMsg: err.message
      }

      this.viewClient(req, res, next)
   })
}


/**
 * Update a Clients Info
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
 exports.updateClient = (req, res, next) => {
   var funcname = 'updateClient():'
   var userid = req.body.id
   var client = req.body
   console.log(fname + funcname + "Userid = " + userid)
   
   var clientName = client.firstName
   var msg = clientName.trim() + '\'s Info'
   var obj = new Object();
   obj.title = app_name;
   obj.message = msg;                  // preset default header message

   database.updateClient(client)
   .then(err => {
      console.log(fname + funcname + " updated " + clientName)
      
      req.body = {
         userid:  req.body.id,
         doAlert: true,
         pugMsg: 'clientUpdated',        
         alertMsg: 'Updated ' +  clientName + '\'s info successfully!'
      }

      this.viewClient(req, res, next)
      
   })
   .catch(err => {
      console.log(fname + funcname + err)

      req.body = {
         userid:  req.body.id,
         doAlert: true,
         pugMsg: 'clientUpdateError',        
         alertMsg: 'Client not updated: ' +  clientName + ' (id:' + userid + ')',
         errorMsg: err.message
      }

      this.viewClient(req, res, next)
   })
 }


 /**
  * Render Edit Client page
  * @param {*} req 
  * @param {*} res 
  * @param {*} next 
  */
exports.editClient = (req, res, next) => {
   var funcname = 'editClient():'
   var userid = req.body.userid
   console.log(fname + funcname + "Userid = " + userid)

   database.retrieveClient(userid)
   .then(client =>{      
      
      if(client){
         var clientName = client.firstName
         var msg = 'Editing ' + clientName.trim() + '\'s Info'
         console.log(fname + funcname + " retrieved " + clientName)
         
         var obj = new Object();
         obj.title = app_name;
         obj.message = msg;           // preset default message
         obj.doAlert = false;                // preset to no alert
         obj.client = client;                // client info
         
         var str = JSON.stringify(obj);
         res.render('editClient',JSON.parse(str))
         
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
 * Render client page
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.viewClient = (req, res, next) => {
   var funcname = "viewClient():"
   var clientid = req.body.userid
   console.log(fname + funcname + "Client id = " + clientid)
   

   database.retrieveClient(clientid)
   .then(client =>{      
      
      if(client){
         var clientName = client.firstName
         var msg = clientName.trim() + '\'s Info'
         console.log(fname + funcname + " retrieved " + clientName)
         
         var obj = new Object();
         obj.title = app_name;
         obj.message = msg;           // preset default message
         obj.client = client;                // client info
         
         //Have an alert message?
         if(req.body.doAlert){
            obj.doAlert = req.body.doAlert
            obj.pugMsg = req.body.pugMsg
            obj.alertMsg = req.body.alertMsg
            obj.errorMsg = req.body.errorMsg
         }else{
            obj.doAlert = false;                // preset to no alert
         }

         
         //Get client notes
         console.log(fname + funcname + "getting notes for client id:" + clientid)
         database.retrieveNotes(clientid).then(notes =>{
            obj.notes = notes

            var str = JSON.stringify(obj);
            res.render('clientHome',JSON.parse(str))
         })


         
      }
      else{
         console.log(fname + funcname + " Userid " + clientid + " not found.")
         req.body = {
            message: 'clientNotFoundById',
            clientId: clientid,
            errormessage: 'clientNotFoundById'
         }   
         landing.get_userHome(req, res, next)
      }
      
   }).catch(err =>{
      console.log(fname + "retrieveClient():" + err)
      req.body = {
         message: 'clientNotFoundById',
         clientId: clientid,
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