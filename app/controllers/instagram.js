var Gram = require('../models/gram.js');

var search = function (req, res, next) {
  Gram.find({}, function (er, results) {
    if (er) {
      console.log(er);
      res.json({
        er: er,
        results: null
      });
    } else {
      res.json({
        er: null,
        results: results
      });
    }
  });
}

module.exports = {
  search: search
}