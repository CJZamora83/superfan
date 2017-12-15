var mongoose = require('mongoose');

var celebritySchema = new mongoose.Schema({
  system: String,
  twitter: String,
  instagram: String,
  youtube: Array,
  pretty: String,
  label: String,
  image: String
});

var Celebrity = mongoose.model('celebrity', celebritySchema);

module.exports = Celebrity;