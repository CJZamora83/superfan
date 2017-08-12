var Tmz = require('../models/media.js');

function search(req, res, next) {
  Tmz.find({
    systemname: req.query.search,
    media_type: 'tmz'
  }, function (er, row) {
    if (er) {
      res.json(er);
    } else {
      res.json(row);
    }
  });
};

function list(req, res, next) {
  Tmz.find({
    media_type: 'tmz'
  }, function (er, row) {
    if (er) {
      res.json(er);
    } else {
      res.json(row);
    }
  });
};

module.exports = {
  search: search,
  list: list
};