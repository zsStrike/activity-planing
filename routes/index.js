var express = require('express');
var Activity = require('../mongodb/models/activity');
var router = express.Router();
var path = require('path');
var app = require('../app');

var userAuth = false;

/* GET home page. */
router.get('/home', function(req, res, next) {
  if(!userAuth){
    res.redirect('/login');
  }
  activities = Activity.findCustom({}, function(activities){
    res.render('home');
  });
});

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
  console.log(req.params, req.body);
  var activity = req.body;
  // activity.startTime = new Date(Activity.timeTrans(activity.startTime));
  // activity.endTime = new Date(Activity.timeTrans(activity.endTime));
  // activity.organizer = activity.organizer.split(/[,，]\s*/);
  // activity.tag = activity.tag.split(/[,，]\s*/);
  // Activity.addOneCustom(activity);
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

router.post('/delete/:id', function(req, res, next){
  Activity.deleteOneCustom({_id: req.params.id}, function(){
    res.redirect('/');
  })
});



module.exports = router;
