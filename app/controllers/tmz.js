var Tmz = require('../models/tmz.js');

function search(req, res, next) {
  Tmz.find({
    systemname: req.query.search
  }, function (er, row) {
    if (er) {
      res.json(er);
    } else {
      res.json(row);
    }
  });
};

function list(req, res, next) {
  Tmz.find({}, function (er, row) {
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