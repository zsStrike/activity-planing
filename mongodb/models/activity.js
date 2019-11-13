var mongoose = require('mongoose');
var activitySchema = require('../schemas/activity');



var Activity = mongoose.model('Activity', activitySchema);

// add one
function addOneCustom(activityObj){
  console.log(activityObj);
  var activity = new Activity(activityObj);
  activity.save(function(err, data){
    if(err) return console.log('[mongoose]: err when saving.');
    console.log(data.name + ' is saved.');
  })
}

function timeTrans(timestr){
  // yy/MM/dd hh:mm
  var match = timestr.match(/(\d+)\-(\d{1,2})\-(\d{1,2})\W+(\d{1,2}):(\d{1,2}).*?/);
  var time = match[2] +  ' ' + match[3] + ', ' + match[1] + ' ' + match[4] + ':' + match[5];
  return time;
}

function findCustom(options, callback){
  Activity.find(options, function(err, res){
    if(err) return console.log('[mongoose]: err when finding.');
    callback(res.sort(function(a, b){
      return new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
    }));
  })
}

function deleteCustom(options, callback){
  Activity.deleteMany(options, function(err){
    if(err) return console.log('[mongoose]: err when deteteAll.');
    callback();
  })
}

function deleteOneCustom(options, callback){
  Activity.deleteOne(options, function(err){
    if(err) return console.log('[mongoose]: err when deteteOne.');
    callback();
  })
}

function updateOneCustom(options, newActObj, callback){
  console.log(newActObj);
  Activity.findByIdAndUpdate(options, newActObj, function(err, res){
    if(err) return console.log('[mongoose]: err when updateOne.');
    callback();
  })
}

module.exports = {
  addOneCustom,
  timeTrans,
  findCustom,
  deleteCustom,
  deleteOneCustom,
  updateOneCustom,
}