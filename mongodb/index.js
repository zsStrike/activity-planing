// link the mongoDB 
var mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

const dbUrl = 'mongodb://localhost:27017/test';
const dbOptions = {useNewUrlParser: true, useUnifiedTopology: true};

mongoose.connect(dbUrl, dbOptions);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
  console.log('[mongoose]: connected');
});


module.exports = db;