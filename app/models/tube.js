var mongoose = require('mongoose');

var tubeSchema = new mongoose.Schema({
  systemname: String,
  username: String,
  video: String,
  createdAt: Date,
  tags: Array,
  title: String
});

var Tube = mongoose.model('Tube', tubeSchema);

module.exports = Tube;