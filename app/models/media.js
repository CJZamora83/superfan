var mongoose = require('mongoose');

var statsSubSchema = {
  views: Number,
  likes: Number,
  dislikes: Number,
  favorites: Number,
  comments: Number
};

var mediaSchema = new mongoose.Schema({
  // all related fields
  systemname: String,
  username: String,
  createdAt: Date,
  media_type: String,

  // instagram and youtube
  video: String,
  image: String,

  // tmz and youtube
  title: String,

  // tmz and instagram
  link: String,

  // tweet schema
  handle: String,
  text: String,
  favorites: Number,
  retweets: Number,
  entities: Object,
  quote: Object,

  // youtube schema
  tags: Array,
  stats: statsSubSchema,

  // tmz schema
  author: String,
  description: String,
  content: String,

  // instagram schema
  type: String,
  caption: String,
  comments: Number,
  likes: Number,
  views: Number,
  insta_id: String,
  thumbnail: String,
  height: Number,
  width: Number
});

var Media = mongoose.model('Media', mediaSchema);

module.exports = Media;
