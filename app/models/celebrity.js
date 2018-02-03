var mongoose = require('mongoose');

var celebritySchema = new mongoose.Schema({
  system: String,
  pretty: String,
  twitter: String,
  instagram: String,
  youtube: Array,
  labels: [String],
  image: String
});

var Celebrity = mongoose.model('celebrity', celebritySchema);

module.exports = Celebrity;