var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session')
var logger = require('morgan');
var bodyParser =  require('body-parser') //DGG json body parser
var favicon = require('serve-favicon'); //for browser tab icon
var moment = require('moment');         //for javascript time operations
var sqlite3 = require('sqlite3').verbose(); 
let dbController = require('./controllers/database_controller') //db controller

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: "The snake, the rat, the cat, the dog",
  resave: true,
  saveUninitialized: true
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({extended: true}));  //DGG body parser
app.use(bodyParser.json());   //DGG json body parser

app.use(favicon(__dirname + '/public/images/favicon.ico')); //browser icon
app.use('/js', express.static(path.join(__dirname, 'node_modules/moment/min')))
app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery/dist')))
app.use('/js', express.static(path.join(__dirname, 'node_modules/popper.js/dist')))
app.use('/css', express.static(path.join(__dirname, 'node_modules/font-awesome/css')))
app.use('/fonts', express.static(path.join(__dirname, 'node_modules/font-awesome/fonts')))
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')))
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')))
app.use('/images', express.static(path.join(__dirname, 'public/images')))


app.use('/', indexRouter);
app.use('/users', usersRouter);

//Test connection to sqlite databases
dbController.initDB()


    // dbController.dropTable(db,'Books')
    // .then(db => {
    //   const sql_create = `CREATE TABLE IF NOT EXISTS Books (
    //   Book_ID INTEGER PRIMARY KEY AUTOINCREMENT,
    //   Title VARCHAR(100) NOT NULL,
    //   Author VARCHAR(100) NOT NULL,
    //   Comments TEXT
    //   );`;
    
    //   db.run(sql_create, err => {
    //     if (err) {
    //       return console.error(err.message);
    //     }
    //     console.log("Successful creation of the 'Books' table");
    //   });
    // })
    // .catch(err => console.log(err))

// const dbName = path.join(__dirname,"data","mnotes.db");
// const db = new sqlite3.Database(dbName, err =>{
//   if(err)
//     return console.error(err.message)

//   console.log("Successful connection to db: " + dbName);
// });

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404)); //creates 404 error page
  
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//DGG Set port and print it out
const PORT = 8888;                                
app.listen(PORT, ()=>{
  console.log('Server running on port ' + PORT);
})

module.exports = app;
