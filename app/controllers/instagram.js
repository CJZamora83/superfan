var Gram = require('../models/gram.js');

var search = function (req, res, next) {
  Gram.find({
    systemname: req.query.search
  }, function (er, row) {
    if (er) {
      console.log(er);
      res.json(er);
    } else {
      res.json(row);
    }
  });
}

var list = function (req, res, next) {
  Gram.find({}, function (er, row) {
    if (er) {
      console.log(er);
      res.json(er);
    } else {
      res.json(row);
    }
  });
}

module.exports = {
  search: search,
  list: list
}