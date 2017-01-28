var Celebrities = require('../models/celebrity.js');

function tags (req, res, next) {
  Celebrities.find({
    prettyName: {
      $regex: req.query.query
    }
  }, function (er, row) {
    if (er) {
      console.log(er);
    }

    var celebrities = [];
    var l = row.length;
    while (l--) {
      celebrities.push({
        text: row[l].pretty,
        system: row[l].system
      });
    }

    res.json(celebrities);
  });
};

function list (req, res, next) {
  Celebrities.find({}, function (er, row) {
    if (er) {
      console.log(er);
    }

    res.json(row);
  });
};

module.exports = {
  tags: tags,
  list: list
};