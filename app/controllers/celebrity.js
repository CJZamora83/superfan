var Celebrities = require('../models/celebrity.js');

function tags (req, res, next) {
  Celebrities.find({
    pretty: {
      $regex: new RegExp(req.query.query, 'i')
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
        system: row[l].system,
        image: row[l].image
      });
    }

    celebrities = celebrities.sort(function(a,b) {
      if (a.text > b.text) {
        return 1;
      } else if (a.text < b.text) {
        return -1;
      } else {
        return 0;
      }
    });

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