var Tweet       = require('../models/tweet.js'),
    Gram        = require('../models/gram.js'),
    Celebrities = require('../models/celebrity.js');

function trending (req, res, next) {
  var oneWeekAgo = new Date();
  oneWeekAgo.setHours(0, 0, 0, 0);
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  Gram.find({
    createdAt: { 
      $gte: oneWeekAgo
    }
  }, {}, {sort: {likes: -1}, limit: 4}, function (er, row) {
    if (er) {
      console.log(er);
      res.json(er);
    } else {
      res.json(row);
    }
  })
}

function mostRecent (req, res, next) {
  Gram.find({}, {}, {sort: {createdAt: -1}, limit: 4}, function (er, row) {
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
  var compiled = [];
  Tweet.find({
    systemname: {
      $in: nameArray
    }
  }, function (er, row1) {
    compiled = row1;
    Gram.find({
      systemname: {
        $in: nameArray
      }
    }, function (er, row2) {
      var l = row2.length;
      while (l--) {
        compiled.push(row2[l]);
      }

      res.json({
        er: null,
        results: compiled
      });
    })
  })
}

module.exports = {
  trending: trending,
  search: search,
  mostRecent: mostRecent
};
