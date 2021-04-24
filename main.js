var createError = require('http-errors');
var express = require('express');
var formidable = require("formidable");
var fs = require("fs");
var session = require('express-session');
var partials = require('express-partials');
var path = require('path');
var bodyParser = require('body-parser');
var url = require('url');
var querystring = require('querystring');
var cookieParser = require('cookie-parser');
var async = require("async");
var logger = require('morgan');
var db = require('./config/database');
//var {redisStore} = require('./redis');
var aws = require('aws-sdk');
var data_menu;
var app = express();
var indexRouter = require('./routes/index');
var loginRouter = require('./routes/login');
var registerRouter = require('./routes/register');
var uploadRouter = require('./routes/upload_file');
var actionRouter = require('./routes/action');
var apiRouter=require('./routes/mobile_index');
var cronJob = require('./cron_jobs/cron_job');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', require('ejs').renderFile);
app.set('view engine', 'ejs');
//session
app.use(session({
  secret: 'WCArticoSession',
//  store: redisStore,
  name:'_WCArticoToken'
//  saveUninitialized: false,
//  resave: false
}));
app.use(partials());
app.use(logger('dev'));
//app.use(bodyParser.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/public', express.static('public')); // <-- This right here

//routers
app.use('/', indexRouter);
app.use('/logReq', loginRouter);
app.use('/regReq', registerRouter);
app.use('/regUpl', uploadRouter);
app.use('/regAct', actionRouter);
app.use('/api', apiRouter);
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
  console.log(err.message);
  res.status(err.status || 500);
  res.render('_error',{error:'',userId:'',userType:'',username:'',userImg:''});
});
cronJob.updatePaymentDueDays();
app.listen(8080);
module.exports = app;
