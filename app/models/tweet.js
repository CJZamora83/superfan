var mongoose = require('mongoose');

var tweetSchema = new mongoose.Schema({
  systemname: String,
  handle: String,
  username: String,
  createdAt: Date,
  text: String,
  favorites: Number,
  retweets: Number
});

var Tweet = mongoose.model('Tweet', tweetSchema);

module.exports = Tweet;