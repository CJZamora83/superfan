var InstagramDb = require('instagram-node');
var instagramdb = new InstagramDb(process.env.CLIENT_ID);

function userIndex(req, res, next) {
  var query - req.body.query;

  instagramdb.search.users({ q: query }, function(err, data) {
    if(err) console.log(err);
    res.json(data);
  });
}

function userShow(req, res, next) {
  var user: req.body.name;

  instagramdb.user.find({ name:`${name}` }, function(err, data) {
    if(err) console.log(err);
    res.json.data;
  });
}

module.exports = {
  userIndex: userIndex,
  userShow: userShow
}
