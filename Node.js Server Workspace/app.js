var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var testRouter = require('./routes/test');
var catalogDataRouter = require('./routes/catalogData');
var itemDataRouter = require('./routes/itemData');
var loginRouter = require('./routes/login');
var verifyLoginRouter = require('./routes/verifyLogin');
var individualRouter = require('./routes/individualPage');
var modifyRouter = require('./routes/modify');
var keyDeleteRouter = require('./routes/keyDelete.js');
var keyRestoreRouter = require('./routes/keyRestore.js');
var addItemRouter = require('./routes/addItem.js');
var emailOrderRouter = require('./routes/emailOrder.js');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/test', testRouter);
app.use('/catalogData', catalogDataRouter);
app.use('/itemData', itemDataRouter);
app.use('/login', loginRouter);
app.use('/verifyLogin',verifyLoginRouter);
app.use('/individualPage', individualRouter);
app.use('/modify', modifyRouter);
app.use('/keyDelete', keyDeleteRouter);
app.use('/keyRestore', keyRestoreRouter);
app.use('/addItem', addItemRouter);
app.use('/emailOrder', emailOrderRouter);



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
