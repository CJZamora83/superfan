var request = require('request');
var locus   = require('locus');
var Instagrammer = require('../models/instagrammer');
var favorites = [];

function instagrammerSearch(req, res, next) {
  // request to Search
  request.get(`https://api.instagram.com/v1/users/search?q=jack&access_token=ACCESS-TOKEN=${req.user.accessToken}`), function(err, response, body) {
    var searchData = JSON.parse(body);
    console.log("Grab data is hit!");
    // If Found save the User ID
    var instagramUserId = searchData.data[0].id;
    // Anon Callback Function to retrieve Media AFTER user ID is found
    function(req, res, next) {
      request.get(`https://api.instagram.com/v1/users/${instagramUserId}/media/recent/?access_token=ACCESS-TOKEN=${req.user.accessToken}`, function(err, response, body) {
        // Callback returns media data
        var instagrammerData = instagrammerData.data.map(imgData => [imgData.images.standard_resolution.url, imgData.images.text, imgData.videos.standard_resolution.url, imgData.user.full_name]);
        // an error? get it out of here!
        if (err) { return next(err); }// respond to the client the data
        res.json(instagrammerData);
      });
    }
  };
}

// function instagrammerFilter(req, res, next) {
//   request.get(`https://api.instagram.com/v1/users/{user-id}/media/recent/?access_token=ACCESS-TOKEN${req.user.accessToken}`, function(err, response, body) {
//     var instagramData = JSON.parse(body);
//     console.log("Grab data is hit!");
//     var instagrammerData = instagrammerData.data.map(igmrData => [igmrData.images.standard_resolution.url, igmrData.images.text, igmrData.videos.standard_resolution.url, igmrData.user.full_name, igmrData.user.id]);
//     res.json(instagrammerData);
//     favorites.push(instagrammerData);
//   });
// }

module.exports = {
  instagrammerSearch: instagrammerSearch
}
