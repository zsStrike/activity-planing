// activity schema
var mongoose = require('mongoose');

var activitySchema = new mongoose.Schema({
  startTime: {
    type: Date,
    required: true,
    default: Date.now
  },
  endTime: {
    type: Date,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  place: {
    type: String,
    required: true
  },
  des: {
    type: String,
    default: 'There is no description yet!'
  },
  organizer: {
    type: String,
    default: 'No organizer stated.'
  }
});

module.exports = activitySchema;