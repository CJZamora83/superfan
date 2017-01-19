var mongoose = require('mongoose');

var gramSchema = new mongoose.Schema({
  systemname: String,
  username: String,
  type: String,
  link: String,
  createdAt: Date,
  image: String,
  video: String,
  caption: String,
  comments: Number,
  likes: Number,
  views: Number
});

var Gram = mongoose.model('Gram', gramSchema);

module.exports = Gram;