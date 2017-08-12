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

  // find tweets and grams based celebrity system name(s)
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

  // find tweets and grams based on celebrity system name(s)
  var compiled = [];
  Meshed.find({
    systemname: {
      $in: nameArray
    }
  }, function (er, row1) {
  
  });
};

module.exports = {
  trending: trending,
  search: search,
  mostRecent: mostRecent,
  mobileSearch: mobileSearch
};
