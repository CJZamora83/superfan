var Gram = require('../models/media.js');

function search (req, res, next) {
  Gram.find({
    systemname: req.query.search,
    media_type: 'instagram'
  }, function (er, row) {
    if (er) {
      console.log(er);
      res.json(er);
    } else {
      res.json(row);
    }
  });
};

function list (req, res, next) {
  Gram.find({
    media_type: 'instagram'
  }, function (er, row) {
    if (er) {
      console.log(er);
      res.json(er);
    } else {
      res.json(row);
    }
  });
};

function home (req, res, next) {
  var twoWeeksAgo = new Date();
  twoWeeksAgo.setHours(0, 0, 0, 0);
  twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);

  Gram.find({
    createdAt: {
      $gte: twoWeeksAgo
    },
    video: null,
    media_type: 'instagram'
  }, {}, {sort: {likes: -1, createdAt: -1}, limit: 4}, function (er, row) {
    if (er) {
      console.log(er);
      res.json(er);
    } else {
      res.json(row);
    }
  });
};


module.exports = {
  search: search,
  list: list,
  home: home
}