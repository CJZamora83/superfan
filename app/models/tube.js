var mongoose = require('mongoose');

var statsSubSchema = {
  views: Number,
  likes: Number,
  dislikes: Number,
  favorites: Number,
  comments: Number
};

var tubeSchema = new mongoose.Schema({
  systemname: String,
  username: String,
  video: String,
  createdAt: Date,
  tags: Array,
  title: String,
  feedImg: String,
  stats: statsSubSchema
});

var Tube = mongoose.model('Tube', tubeSchema);

module.exports = Tube;