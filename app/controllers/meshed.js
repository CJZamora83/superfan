var Tweet       = require('../models/tweet.js'),
    Gram        = require('../models/gram.js'),
    Celebrities = require('../models/celebrity.js');

function trending (req, res, next) {
  Gram.find({}, {}, {sort: {likes: -1}, limit: 4}, function (er, row) {
    if (er) {
      console.log(er);
      res.json(er);
    } else {
      res.json(row);
    }
  })
}

function search (req, res, next) {
  Celebrities.find({
    prettyName: {
      $regex: req.query.search
    }
  }, function (er, row) {
    if (er) {
      console.log(er);
      res.json({
        er: er,
        results: null
      })
    }

    if (row.length > 1) {
      // "did you mean?"
      res.json({
        er: "to many celebrities recognized",
        results: row
      });
    } else if (row.length === 0) {
      // "did not find results"
      res.json({
        er: "did not recognize celebrity",
        results: null
      });
    } else {
      // find tweets and grams based celebrity system name
      var compiled = [];
      var celebrity = row[0];
      Tweet.find({
        systemname: celebrity.systemName
      }, function (er, row1) {
        compiled = row1;
        Gram.find({
          systemname: celebrity.systemName
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
  });
}

module.exports = {
  trending: trending,
  search: search
};
