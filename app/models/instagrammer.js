var mongoose = require('mongoose'),
    debug    = require('debug')('app:models');

var instagrammerSchema = new mongoose.Schema({
  full_name: String,
  instagramId: String
});

var Instagrammer = mongoose.model('Instagrammer', instagrammerSchema);


// Export Instagrammer model
module.exports = Instagrammer;
