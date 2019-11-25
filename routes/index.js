var express = require('express');
var Activity = require('../mongodb/models/activity');
var router = express.Router();
var path = require('path');
var app = require('../app');

var userAuth = true;

/* GET home page. */
router.get('/home', function(req, res, next) {
  activities = Activity.findCustom({}, function(activities){
    res.render('home');
  });
});

router.get('/table', function(req, res, next) {
  res.render('table');
});

router.post('/getTable', function(req, res, next){
  Activity.getWeekCoursesList(undefined, function(courseList){
    let week = Activity.getWeek();
    let courseType = Activity.getCourseType();
    // console.log(courseList, week, courseType);
    res.json({courseList, courseType, week});
  })
})

router.get('/login', function(req, res, next){
  res.render('login');
});

router.post('/login', function(req, res, next){
  if(req.body.loginUsername === '123456' && req.body.loginPassword === '123456'){
    userAuth = true;
    res.redirect('/home');
  }else{
    userAuth = false;
    res.render('login', {msg: 'Wrong Password'});
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
    res.send('delete done')
  })
});





module.exports = router;
