// (function() {
//   "use strict";

//   angular
//     .module("superfanApp")
//     .factory("instagrammerDataService", instagrammerService);

//   instagrammerDataService.$inject = ['$http'];

//     function instagrammerDataService($state, $log, $http, userDataService, $timeout) {
//     var instagrammerFactory = {
//       instagrammer: {}
//     };

//       // get a single user
//     instagrammerFactory.get = function(id) {
//       return $http.get('https://api.instagram.com/v1/users/search?q=jack&access_token=ACCESS-TOKEN=${req.user.accessToken}' + id);
//       var searchData = JSON.parse(body);
//       console.log("Grab data is hit!");
//       var instagrammerData = searchData.data.map(imgData => [imgData.images.standard_resolution.url, imgData.images.text, imgData.videos.standard_resolution.url, imgData.user.full_name]);
//       res.json(instagrammerData);
//     };

//     // get all users
//     instagrammerFactory.all = function() {
//       return $http.get('https://api.instagram.com/v1/users/self/media/liked?access_token=${req.user.accessToken}');
//       var userData = JSON.parse(body);
//     console.log("Grab liked is hit!");
//     var likedImgLoc = userData.data.map(imgData => [imgData.images.standard_resolution.url, imgData.location, imgData.user.full_name]);
//     res.json(likedImgLoc);
//     };
//   }
// })();
