var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
const passport = require('passport');
require('dotenv').config();

// CONNECT TO DATABASE
require('./config/database');

// AUTHENTICATION
require('./config/passport');

// ADD'L PACKAGES
const methodOverride = require('method-override');

// REQUIRE ROUTERS
var indexRouter = require('./routes/index');
var jobAppsRouter = require('./routes/jobapps');
const tasksRouter = require('./routes/tasks');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// MIDDLEWARE PIPELINE
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// ADD'L MIDDLEWARE
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(function(req, res, next) {
  res.locals.user = req.user;
  next();
});

app.use(methodOverride('_method'));

// MOUNT ROUTER MIDDLWARE
app.use('/', indexRouter);
app.use('/jobapps', jobAppsRouter);
app.use('/', tasksRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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

module.exports = app;
