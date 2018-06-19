const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const session = require('express-session');
const validator =  require('express-validator');
const MongoStore = require('connect-mongo')(session);
const flash = require('connect-flash');
const config = require('./config/config');
const cors = require('cors');
const jwt = require('express-jwt');

const indexRouter = require('./server/routes/index');
const userRouter = require('./server/routes/users');
const jobRouter = require('./server/routes/jobs');

var app = express();

mongoose.connect(config.database, function(err){
  if (err) {
    console.log(err);
  } else {
    console.log('Successfully connected to the MongoDB server');
  }
});

mongoose.Promise= require('bluebird');

// view engine setup
app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'ejs');

//Lots and lots of Middleware
app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/public')));
app.use(session({
  secret: config.secret,
  resave: true,
  saveUninitialized: true,
  cookie: {secure: true},
  store: new MongoStore({
    mongooseConnection: mongoose.connection
  })
}));
app.use(jwt({
  secret: config.JWT_SECRET,
  credentialsRequired: false,
  getToken: function fromHeaderOrQuerystring (req) {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        return req.headers.authorization.split(' ')[1];
    } else if (req.query && req.query.token) {
      return req.query.token;
    }
    return null;
  }
}));
app.use(require('connect-flash')());
app.use(function(req, res, next){
  res.locals.messages = require('express-messages')(req,res);
  next();
});
app.use(validator({
  errorFormatter: function(param, msg, value){
    let namespace = param.split('.'),
    root =namespace.shift(),
    formParam = root;

    while(namespace.length){
      formParam += '['+ namespace.shift() + ']';
    }
    return {
      param: formParam,
      msg: msg,
      value: value
    }
  }
}));



app.get('*', function(req, res, next){
  res.locals.user = req.user|| null;
  next();
});

app.use('/', indexRouter);
app.use('/job', jobRouter);
app.use('/user', userRouter);


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
