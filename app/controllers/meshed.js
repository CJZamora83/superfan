var Tweet       = require('../models/tweet.js'),
    Gram        = require('../models/gram.js'),
    Tube        = require('../models/tube.js'),
    Celebrities = require('../models/celebrity.js'),
    Tmz         = require('../models/tmz.js');

function trending (req, res, next) {
  var oneWeekAgo = new Date();
  oneWeekAgo.setHours(0, 0, 0, 0);
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  Gram.find({
    createdAt: { 
      $gte: oneWeekAgo
    },
    video: null
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
  Gram.find({ video: null }, {}, { sort: { createdAt: -1 }, limit: 4 }, function (er, row) {
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
    if (er) {
      console.log(er);
    }

    compiled = row1;
    Gram.find({
      systemname: {
        $in: nameArray
      }
    }, function (er, row2) {
      if (er) {
        console.log(er);
      }

      var l = row2.length;
      while (l--) {
        compiled.push(row2[l]);
      }

      Tube.find({
        systemname: {
          $in: nameArray
        }
      }, function (er, row3) {
        if (er) {
          console.log(er);
        }

        var l_ = row3.length;
        while (l_--) {
          compiled.push(row3[l_]);
        }

        Tmz.find({
          systemname: {
            $in: nameArray
          }
        }, function (er, row4) {
          if (er) {
            console.log(er);
          }

          var l__ = row4.length;
          while (l__--) {
            compiled.push(row4[l__]);
          }

          res.json({
            er: null,
            results: compiled
          });
        })
      });
    })
  })
}

module.exports = {
  trending: trending,
  search: search,
  mostRecent: mostRecent
};
