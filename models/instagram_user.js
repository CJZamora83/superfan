var mongoose = require('mongoose'),
    debug    = require('debug')('app:models');

var VenueSchema = new mongoose.Schema({
  name:   String,
  full_name: String
});

var instagram_User = mongoose.model('Instagram_User', Instagram_UserSchema);

module.exports = Venue;
