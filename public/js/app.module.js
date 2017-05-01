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
              service.feed.push(posts[l]);
            }

            service.feed = service.feed.sort(function (a, b) {
              return new Date(b.createdAt) - new Date(a.createdAt);
            });
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

      service.sortFeed = function (type) {
        if (type === 'most recent') {
          service.feed = service.feed.sort(function (a, b) {
            return new Date(b.createdAt) - new Date(a.createdAt);
          })
        } else if (type === 'trending') {
          // rss dont have trending stats so
          // loop through take rss out
          // sort based on trending
          // loop over the rss posts that were taken out
          //      and randomly put them in the Math.random(), Math.ceil()
          //      and the length of the existing array of other posts
          var tmz = [];
          for (var l in service.feed) {
            if (service.feed[l].author) {
              tmz.push(service.feed.splice(l,1));
            }
          }

          service.feed = service.feed.sort(function (a, b) {
            var aNum = 0;
            var bNum = 0;
            if (a.comments) {
              // instagram
              aNum = (a.likes || 0);
            } else if (a.retweets) {
              // twitter
              aNum = (a.retweets || 0) + (a.favorites || 0);
            } else if (a.stats) {
              // youtube
              aNum = ((a.stats.comments || 0) + (a.stats.favorites || 0) + (a.stats.views || 0) + (a.stats.likes || 0)) - (a.stats.dislikes || 0);
            }

            if (b.comments) {
              // instagram
              bNum = (b.likes || 0);
            } else if (b.retweets) {
              // twitter
              bNum = (b.retweets || 0) + (b.favorites || 0);
            } else if (b.stats) {
              // youtube
              bNum = ((b.stats.comments || 0) + (b.stats.favorites || 0) + (b.stats.views || 0) + (b.stats.likes || 0)) - (b.stats.dislikes || 0);
            }

            return bNum - aNum;
          });

          for (var l in tmz) {
            service.feed.splice(Math.ceil(Math.random() * service.feed.length), 0, tmz[l]);
          }
        }

        return service.feed;
      };

      service.filterFeed = function (type) {
        // filter out based on the type
        // first brainstorm: sort out content type, youtube,instagram,twitter,etc.
      }

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
    });
})();
