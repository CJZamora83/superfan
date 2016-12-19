var Celebrities = require('../models/celebrity.js');

Celebrities.find({}, function (er, row) {
  console.log(row);
});