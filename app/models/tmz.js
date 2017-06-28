var mongoose = require('mongoose');

var tmzSchema = new mongoose.Schema({
  systemname: String,
  createdAt: Date,
  title: String,
  author: String,
  description: String,
  content: String,
  link: String
});

var Tmz = mongoose.model('Tmz', tmzSchema);

module.exports = Tmz;