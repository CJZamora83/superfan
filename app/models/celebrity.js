var mongoose = require('mongoose');

var celebritySchema = new mongoose.Schema({
  systemName: String,
  twitterName: String,
  instagramName: String,
  youtubeName: String,
  prettyName: String
});

var Celebrity = mongoose.model('celebrity', celebritySchema);

module.exports = Celebrity;