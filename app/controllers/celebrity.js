var Celebrities = require('../models/celebrity.js');

function tags (req, res) {
  Celebrities.find({}, function (er, row) {
    if (er) {
      console.log(er);
    }

    var celebrities = []
    var l = row.length;
    while (l--) {
      celebrities.push({
        text: row[l].prettyName
      })
    }

    console.log(celebrities)

    res.json(celebrities);
  })
}

module.exports = {
  tags: tags
};