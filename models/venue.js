var mongoose = require('mongoose'),
    debug    = require('debug')('app:models');

var VenueSchema = new mongoose.Schema({
  name:   String,
  address: String,
  email: String,
  phone: String,
  estab_type: String
});

var Venue = mongoose.model('Venue', VenueSchema);

module.exports = Venue;
