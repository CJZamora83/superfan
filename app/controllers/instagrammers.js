var request = require('request');
var locus   = require('locus');
var Instagrammer = require('../models/instagrammer');
var favorites = [];

function instagrammerSearch(req, res, next) {
  request.get(`https://api.instagram.com/v1/users/search?q=jack&access_token=ACCESS-TOKEN=${req.user.accessToken}`, function(err, response, body) {
    var instagramData = JSON.parse(body);
    console.log("Grab data is hit!");
    var instagrammerData = instagrammerData.data.map(imgData => [imgData.images.standard_resolution.url, imgData.images.text, imgData.videos.standard_resolution.url, imgData.user.full_name]);
    res.json(instagrammerData);
  });
}

function instagrammerFilter(req, res, next) {
  request.get(`https://api.instagram.com/v1/users/{user-id}/media/recent/?access_token=ACCESS-TOKEN${req.user.accessToken}`, function(err, response, body) {
    var instagramData = JSON.parse(body);
    console.log("Grab data is hit!");
    var instagrammerData = instagrammerData.data.map(igmrData => [igmrData.images.standard_resolution.url, igmrData.images.text, igmrData.videos.standard_resolution.url, igmrData.user.full_name, igmrData.user.id]);
    res.json(instagrammerData);
    favorites.push(instagrammerData);
  });
}

module.exports = {
  instagrammerSearch: instagrammerSearch
}
