var Media        = require('../models/media.js'),
    Celebrities = require('../models/celebrity.js');

function trending (req, res, next) {
  var oneWeekAgo = new Date();
  oneWeekAgo.setHours(0, 0, 0, 0);
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  console.log(oneWeekAgo)

  Media.find({
    video: null,
    media_type: 'instagram',
    createdAt: {
      $gte: oneWeekAgo
    }
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
  });
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
  var sort = {};

  if (req.query.type === 'mostRecent') {
    sort = { createdAt: -1 };
  } else if (req.query.type === 'trending') {
    sort = { likes: -1, views: -1, favorites: -1, retweets: -1, 'stats.views': -1, 'stats.likes': -1, 'stats.favorites': -1, createdAt: -1 };
  }

  if (req.query.label) {
    Celebrities.find({
      label: {
        $in: req.query.label.split(';')
      }
    }, function (er, celebrities) {
      if (er) console.log(er);
      if (celebrities.length >= 0) celebrities.forEach(function (item) { if (nameArray.indexOf(item.system) < 0) { nameArray.push(item.system); } });

      // find media based on celebrity system name(s)
      Media.find({
        systemname: {
          $in: nameArray
        }
      }, {}, { limit: 50, skip: parseInt(req.query.skip), sort: sort }, function (er, row) {
        if (er) {
          console.log(er);
        } else {
          res.json(row);
        }
      });
    })
  } else {
    // find media based on celebrity system name(s)
    Media.find({
      systemname: {
        $in: nameArray
      }
    }, {}, { limit: 50, skip: parseInt(req.query.skip), sort: sort }, function (er, row) {
      if (er) {
        console.log(er);
      } else {
        res.json(row);
      }
    });
  }
};

module.exports = {
  trending: trending,
  search: search,
  mostRecent: mostRecent,
  mobileSearch: mobileSearch
};
