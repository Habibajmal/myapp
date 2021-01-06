var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var mongoose = require('mongoose');
var config=require('config');
var indexRouter = require('./routes/index');
var userRouter = require('./routes/api/user');
var carsRouter = require('./routes/api/cars');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
var cors=require("cors");
const corsOptions= {
  allowHeaders:[
    "Origin",
    "X-Requested-Width",
    "Content-Type",
    "Accept",
    "X-Acess-Token",
    "Authorization",
  ],
  crendentials:true,
  methods:"GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
  origin:"http://localhost:3000",
  preflightContinue:false,
};

app.use('/', indexRouter);
app.use('/api/user', userRouter);
app.use('/api/cars', carsRouter);

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

mongoose
.connect(config.get("db")
,{ useNewUrlParser: true,useUnifiedTopology: true })
.then(() => console.log("Connected to Mongo...."))
.catch((error) => console.log(error.message));
module.exports = app;
