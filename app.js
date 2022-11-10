//import sequelize
const sequelize = require('./models/index.js').sequelize;

(async () => {
  //sync the model with the database
  await sequelize.sync({
    force: true
  });
  try {
    //used authenticate() method to connect asynchronously to the database
    await sequelize.authenticate();
    console.log('Connection to the database successful!');
  } catch (error) {
    console.error('Error connection to the database: ', error);
  }
})();

//------------------------------------------------------------------------------------------
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

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

//  error handler
app.use((req, res, next) => {
  const err = new Error();
  err.status = 404;
  err.message = 'Looks like something went wrong.';
  next(err);
  res.render(("page-not-found"),{err} );
});

// global error handler
app.use(function(err, req, res, next) {
  console.log(err.status);
  console.log(err.message);
  // res.status(err.status || 500);
  res.render(('error'), {err});
});



module.exports = app;

