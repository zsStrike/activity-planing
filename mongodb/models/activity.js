var mongoose = require('mongoose');
var activitySchema = require('../schemas/activity');
require('date-utils');

var courseType = [
  [{name: '8:00'}, 1],
  [{name: '8:30'}, 1],
  [{name: '9:00'}, 1],
  [{name: '9:30'}, 1],
  [{name: '10:00'}, 1],
  [{name: '10:30'}, 1],
  [{name: '11:00'}, 1],
  [{name: '11:30'}, 1],
  [{name: '12:00'}, 1],
  [{name: '12:00'}, 1],
  [{name: '13:00'}, 1],
  [{name: '13:30'}, 1],
  [{name: '14:00'}, 1],
  [{name: '14:30'}, 1],
  [{name: '15:00'}, 1],
  [{name: '15:30'}, 1],
  [{name: '16:00'}, 1],
  [{name: '16:30'}, 1],
  [{name: '17:00'}, 1],
  [{name: '17:30'}, 1],
  [{name: '18:00'}, 1],
  [{name: '18:30'}, 1],
  [{name: '19:00'}, 1],
  [{name: '19:30'}, 1],
  [{name: '20:00'}, 1],
  [{name: '20:30'}, 1],
  [{name: '21:00'}, 1],
  [{name: '21:30'}, 1],
  [{name: '22:00'}, 1],
  [{name: '22:30'}, 1],
];

var week = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];

var act_len = {};

var Activity = mongoose.model('Activity', activitySchema);

var courseList = new Array(7);
for (let i = 0; i < courseList.length; i++) {
  courseList[i] = new Array(30);
}

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

function getOneByName(options, callback){
  Activity.findOne(options, function(err, res){
    if(err){
      return console.log('[mongoose]: err when getOneByName');
    }
    callback(res);
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

function getWeekCoursesList(startTime, callback){
  /**
   * startTime + 7 days' activities
   * @return Array 7 * 30
   */

  for (let i = 0; i < 7; i++) {
    for (let j = 0; j < 30; j++) {
      courseList[i][j] = undefined;
    }
  }
  let start = startTime ? startTime : new Date();
  start = getCurrentWeekStartDay(start);
  let end = start.clone();
  end.addDays(7);
  // console.log('test:', start.toLocaleString("chinese"), end);
  Activity.find().sort().exec()
  Activity.find({"startTime": {"$gt": start}, "endTime": {"$lt": end}}).sort({'startTime': 1}).exec(function(err, res){
    if(err){
      return console.log('[mongoose]: err when getWeekCourseList.');
    }
    // console.log(res, '\n');
    // console.log(start.toLocaleString("chinese", {hour12: false}), end.toLocaleString("chinese", {hour12: false}));
    for (let i = 0; i < res.length; i++) {
      const element = res[i];
      // console.log(element.startTime.toLocaleString("chinese", {hour12: false}), start.toLocaleString("chinese", {hour12: false}));
      let delta = element.startTime.getTime() - start.getTime();
      delta = Math.floor(delta / 60000);  //分钟数
      let j = Math.floor(delta / 1440);  //天数
      let k = Math.floor(((delta % 1440) - 480) / 30); // 位于哪个格子
      // console.log(`j = ${j}, k = ${k}`);
      courseList[j][k] = element.name + '@' + element.place;
      delta = element.endTime.getTime() - element.startTime.getTime();
      m = Math.floor(delta / 60000 / 30);
      for (let n = 1; n < m; n++) {
        courseList[j][k + n] = courseList[j][k];    
      }
      act_len[element.name + '@' + element.place] = m;
    }
    for (let i = 0; i < 7; i++) {
      for (let j = 0; j < 30; j++) {
        if(!courseList[i][j]){
          courseList[i][j] = '';
        } 
      }
    }
    // console.log(act_len);
    callback(courseList, act_len);
  })
}

function getCurrentWeekStartDay(start){
  /**
   * @return Date
   */
  let date = new Date(start.getFullYear(), start.getMonth(), start.getDate() - start.getDay() + 1);
  return date;
}

function getCourseType(){
  return courseType;
}

function getWeek(){
  return week;
}

module.exports = {
  addOneCustom,
  timeTrans,
  findCustom,
  deleteCustom,
  deleteOneCustom,
  updateOneCustom,
  getWeekCoursesList,
  getCourseType,
  getWeek,
  getOneByName,
}