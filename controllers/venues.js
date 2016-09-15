// Require resource's model(s).
var Venue = require("../models/venue");

var index = function(req, res, next){
  Venue.find({}, function(err, venues) {
    if (err) {
      res.json({message: err});
    } else {
      res.json(venues);
    }
  });
};

var show = function(req, res, next){
  Venue.findById(req.params.id, function(err, venue) {
    if (err) {
      res.json({message: 'Could not find venue because ' + err});
    } else if (!Venue) {
      res.json({message: 'No user with this id.'});
    } else {
      res.json(venue);
    }
  });
};

var create = function(req, res, next) {
  Venue.create({name: "fake venue", address: "123 A St"}, function(err, venue){
    res.json({message: "Created fake venue."});
  })
}

module.exports = {
  index: index,
  show:  show,
  create: create
};
