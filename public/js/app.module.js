(function() {

  angular.module('superfanApp', [
    "ui.router", 'satellizer', 'ngTagsInput', 'ui.bootstrap'
    ])

    .config(function($httpProvider, $authProvider) {
      $authProvider.instagram({
        clientId: 'ebbedcbd196949a3848d793d4a3dd4f3'
      });
    })
    .service('feedService', function ($http) {
      var service = {};
      service.feed = [];
      service.added = [];
      service.addFeed = function (name) {
        if (service.added.indexOf(name) < 0) {
          service.added.push(name);
          $http.get('/api/search?search=' + name).then(function (results) {
            var posts = results.data.results;
            var l = posts.length;
            while (l--) {
              service.feed.push(posts[l]);
            }

            service.feed = service.feed.sort(function (a, b) {
              return new Date(b.createdAt) - new Date(a.createdAt);
            });
          });
        }
      }

      service.getFeed = function () {
        return service.feed;
      }

      return service;
    })
    .filter("trust", function($sce) {
      return function(htmlCode){
        return $sce.trustAsHtml(htmlCode);
      }
    });



})();