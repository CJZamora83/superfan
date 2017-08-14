var Media        = require('../models/media.js'),
    Celebrities = require('../models/celebrity.js');

function trending (req, res, next) {
  var oneWeekAgo = new Date();
  oneWeekAgo.setHours(0, 0, 0, 0);
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  Media.find({
    createdAt: { 
      $gte: oneWeekAgo
    },
    video: null,
    media_type: 'instagram'
  }, {}, { sort: { likes: -1, createdAt: -1 }, limit: 4 }, function (er, row) {
    if (er) {
      console.log(er);
      res.json(er);
    } else {
      res.json(row);
    }
  })
}

function mostRecent (req, res, next) {
  Media.find({ video: null, media_type: 'instagram' }, {}, { sort: { createdAt: -1 }, limit: 4 }, function (er, row) {
    if (er) {
      console.log(er);
      res.json(er);
    } else {
      res.json(row);
    }
  })
}

function search (req, res, next) {
  var nameArray = req.query.search.split(';');

  // find media based on celebrity system name(s)
  Media.find({
    systemname: {
      $in: nameArray
    }
  }, function (er, row) {
    if (er) {
      console.log(er);
    }

    res.json({
      er: null,
      results: row
    });
  });
};

function mobileSearch (req, res, next) {
  var nameArray = req.query.search.split(';');

  // find media based on celebrity system name(s)
  Media.find({
    systemname: {
      $in: nameArray
    }
  }, {}, { limit: 50, skip: parseInt(req.query.skip), sort: { createdAt: -1 } }, function (er, row) {
    if (er) {
      console.log(er);
    } else {
      res.json(row);
    }
  });
};

module.exports = {
  trending: trending,
  search: search,
  mostRecent: mostRecent,
  mobileSearch: mobileSearch
};
