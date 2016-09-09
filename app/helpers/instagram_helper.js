var request = require('request');
var locus   = require('locus');
var User = require('../models/user');

function grabMedia(req, res, next) {
  request.get(`https://api.instagram.com/v1/users/{user-id}/media/recent/?access_token=ACCESS-TOKEN=${req.user.accessToken}`, function(err, response, body) {
    var userData = JSON.parse(body);
    console.log("Grabbed media!");
    var likedImgLoc = userData.data.map(imgData => [imgData.images.standard_resolution.url, imgData.user.full_name]);
    res.json(likedImgLoc);
  });
}

module.exports = {
  grabMedia: grabMedia
}
