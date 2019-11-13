// activity schema
var mongoose = require('mongoose');

var activitySchema = new mongoose.Schema({
  startTime: {
    type: Date,
    default: Date.now
  },
  endTime: {
    type: Date,
    default: Date.now
  },
  name: String,
  place: String,
  des: {
    type: String,
    default: 'There is no description yet!'
  },
  organizer: [String],
  tag: [String]  // 讲座，活动
});

module.exports = activitySchema;