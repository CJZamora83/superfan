(function() {

  angular.module('superfanApp', [
    "ui.router", 'satellizer', 'ngTagsInput', 'ui.bootstrap', 'masonry'
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
      service.tagsAdded = [];
      service.tags = [];
      service.addFeed = function (name) {
        if (service.added.indexOf(name) < 0) {
          service.added.push(name);
          $http.get('/api/search?search=' + name).then(function (results) {
            var posts = results.data.results;
            var l = posts.length;
            while (l--) {
              if (posts[l].entities) {
                console.log(posts[l]);
              }
              service.feed.push(posts[l]);
            }

            service.feed = service.feed.sort(function (a, b) {
              return new Date(b.createdAt) - new Date(a.createdAt);
            });

            console.log(service.feed);
          });
        }
      };

      service.removeFeed = function (name) {
        if (service.added.indexOf(name) >= 0) {
          var l_ = service.added.length;
          while (l_--) {
            if (service.added[l_] === name) {
              service.added.splice(l_, 1);
            }
          }

          var posts = service.feed;
          var l = posts.length;
          while (l--) {
            if (posts[l].systemname === name) {
              posts.splice(l, 1);
            }
          }

          service.feed = service.feed.sort(function (a, b) {
            return new Date(b.createdAt) - new Date(a.createdAt);
          });
        }
      };

      service.getFeed = function () {
        return service.feed;
      };

      service.getTags = function () {
        return service.tags;
      };

      service.resetTags = function () {
        service.tags = [];
        return service.tags;
      }

      return service;
    })
    .filter("trustHtml", function($sce) {
      return function(htmlCode){
        return $sce.trustAsHtml(htmlCode);
      }
    })
    .filter("trustUrl", function($sce) {
      return function(url){
        return $sce.trustAsResourceUrl(url);
      }
    })
    .filter("twitterUrl", function() {
      return function (text, post){
        console.log(post.entities);
        if (post.entities) {
          if (post.entities.basic) {
            if (post.entities.basic.urls.length > 0) {
              var l = post.entities.basic.urls.length;
              var replacement
              while (l--) {
                replacement = '<a href="' + post.entities.basic.urls[l].expanded_url + '" target="_blank">' + post.entities.basic.urls[l].display_url + '</a>';
                text = text.replace(post.entities.basic.urls[l].url, replacement);
              }
            }
          }
        }

        console.log(text)
        return text;
      }
    });
})();
