var express = require('express');
var Activity = require('../mongodb/models/activity');
var router = express.Router();
var path = require('path');
var app = require('../app');

var userAuth = true;

router.use(function(req, res, next){
  console.log(req.session);
  next();
})

router.get('/home', function(req, res, next){
  if(!req.session.auth) res.redirect('/login');
  else next();
})

/* GET home page. */
router.get('/home', function(req, res, next) {
  activities = Activity.findCustom({}, function(activities){
    res.render('home');
  });
});

router.get('/table', function(req, res, next) {
  let userAuth = req.session.auth ? "true" : "false";
  res.render('table', {userAuth});
});

router.post('/getTable', function(req, res, next){
  console.log(req.body, req.params);
  Activity.getWeekCoursesList(new Date(req.body.currentDate), function(courseList){
    let week = Activity.getWeek();
    let courseType = Activity.getCourseType();
    // console.log(courseList, week, courseType);
    res.json({courseList, courseType, week});
  })
})

router.get('/login', function(req, res, next){
  let msg = req.session.wp ? "Wrong Password" : "";
  res.render('login', {msg});
});

router.post('/login', function(req, res, next){
  if(req.body.loginUsername === 'admin' && req.body.loginPassword === 'password'){
    req.session.auth = true;
    req.session.wp = false;
    req.session.cookie.auth = true;
    res.redirect('/home');
  }else{
    req.session.auth = false;
    req.session.wp = true;
    res.redirect('/login');
  }
});

router.post('/addOne', function(req, res, next) {
  console.log(req.body);
  var data = req.body;
  var activity = {};
  activity.startTime = new Date(data.startDate);
  activity.endTime = new Date(data.endDate);
  activity.organizer = data.actOrg;
  activity.name = data.actName;
  activity.place = data.actPlace;
  activity.des = data.actDes;
  Activity.addOneCustom(activity);
  res.send('/home');
});

router.post('/deleteAll', function(req, res, next){
  Activity.deleteCustom({}, function(){
    res.redirect('/');
  })
});

router.post('/update/:id', function(req, res, next){
  var activity = req.body;
  activity.startTime = new Date(Activity.timeTrans(activity.startTime));
  activity.endTime = new Date(Activity.timeTrans(activity.endTime));
  activity.organizer = activity.organizer.split(/[,，]\s*/);
  activity.tag = activity.tag.split(/[,，]\s*/);
  Activity.updateOneCustom({_id: req.params.id}, activity, function(){
    res.redirect('/');
  })
})

router.post('/delete/:name', function(req, res, next){
  Activity.deleteOneCustom({name: req.params.name}, function(){
    console.log(req.params)
    res.send();
  })
});

router.post('/getOne/:name', function(req, res, next){
  Activity.getOneByName({name: req.params.name}, function(act){
    res.json(act);
  })
})





module.exports = router;
