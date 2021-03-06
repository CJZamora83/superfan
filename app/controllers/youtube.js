var Media = require('../models/media.js');

function search(req, res, next) {
  Media.find({
    systemname: req.query.search,
    media_type: 'youtube'
  }, function (er, row) {
    if (er) {
      res.json(er);
    } else {
      res.json(row);
    }
  })
}

function list(req, res, next) {
  Media.find({
    media_type: 'youtube'
  }, function (er, row) {
    if (er) {
      res.json(er);
    } else {
      res.json(row);
    }
  });
};

function home(req, res, next) {
  var twoWeeksAgo = new Date();
  twoWeeksAgo.setHours(0, 0, 0, 0);
  twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);

  Media.find({
    createdAt: {
      $gte: twoWeeksAgo
    },
    media_type: 'youtube'
  }, {}, {sort: {createdAt: -1}, limit: 4}, function (er, row) {
    if (er) {
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
};
