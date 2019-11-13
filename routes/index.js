var express = require('express');
var Activity = require('../mongodb/models/activity');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  activities = Activity.findCustom({}, function(activities){
    res.render('index', { title: 'Express' , activities});
  });
});

router.post('/addOne', function(req, res, next) {
  var activity = req.body;
  activity.startTime = new Date(Activity.timeTrans(activity.startTime));
  activity.endTime = new Date(Activity.timeTrans(activity.endTime));
  activity.organizer = activity.organizer.split(/[,，]\s*/);
  activity.tag = activity.tag.split(/[,，]\s*/);
  Activity.addOneCustom(activity);
  res.redirect('/');
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
