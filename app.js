var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
var db = require('./mongodb/index')
var mongoose = require('mongoose');
var activitySchema = require('./mongodb/schemas/activity');
var session = require('express-session');
var FileStore = require('session-file-store')(session);

// var Activity = mongoose.model('Activity', activitySchema);

// var lecture = new Activity({
//   startTime: new Date(),
//   endTime: new Date(new Date().setMinutes(new Date().getMinutes() + 30)),
//   place: '3A213',
//   des: '测试用例',
//   organizer: ['学生会'],
//   tag: ['讲座']
// });

// lecture.save();
// Activity.findOne({des: '测试用例'},function(err, activity){
//   console.log(activity);
// })
// Activity.updateOne({des: '测试用例'}, {organizer: ['呵呵']});
// Activity.deleteOne({des: '测试用例'}, function(err, data){
//   console.log(err + data);
// });
// Activity.deleteOne({_id: '5dc7e73a4b06510bd861d556'}, function(err, activity){
//   if(err) {return console.log('err happend');}
//   console.log(`${activity} is deleted.`);
// })

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
app.use(cookieParser('secret'));
app.use(session({
  cookie: {
    path: '/',
    signed: true,
    maxAge: 100000
  },
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
  rolling: false,
  // store: new FileStore()
}));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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
