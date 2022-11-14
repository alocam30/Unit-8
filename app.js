//import sequelize
const Sequelize = require('./models/index.js').sequelize;

(async () => {
  //sync the model with the database
  await Sequelize.sync({
  });
  try {
    //used authenticate() method to connect asynchronously to the database
    await Sequelize.authenticate();
    console.log('Connection to the database successful!');
  } catch (error) {
    console.error('Error connection to the database: ', error);
  }
})();

//------------------------------------------------------------------------------------------
const createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const db = require("./models/index")

var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

const app = express();

const routes = require('./routes/index');
const users = require('./routes/users');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/static', express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/books', users);

const err = new Error();

//  error handler
app.use((req, res, next) => {
  const err = new Error(); 
  err.status = 404;  
  err.message = 'Sorry, we unfortunately do not have a page that matches your search. Please try again.'
  // res.render(("page-not-found"), {err})
  next(err);
});


// global error handler
app.use(function(err, req, res, next) { 
    if (err.status === 404) {
      res.status(err.status);
      res.render("page-not-found", { err })
    } else {
      err.message = err.message || `Sorry! There was an unexpected error.`;
      res.status(err.status || 500);
      res.render('error', {err});
    }
});



module.exports = app;

