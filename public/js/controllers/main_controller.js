(function() {
  "use strict";

    angular
      .module("superfanApp")
      .run(['$anchorScroll', function($anchorScroll) {
        $anchorScroll.yOffset = 50;
      }])
      .controller("MainController", MainController);

  MainController.$inject = ['$scope','userDataService', '$state', '$http', 'feedService', '$location', '$anchorScroll'];

  function MainController($scope, userDataService, $state, $http, feedService, $location, $route, $anchorScroll) {
    var vm = this;
    var celebritiesPretty = {};
    $scope.feedPage = false;
    $scope.tags = feedService.getTags();
    $scope.feedService = feedService;
    $scope.scrolled = false;
    $scope.$anchorScroll = $anchorScroll;
    $scope.mobile = false;
    $scope.mobileNavSearchToggle = false;

    function detectmob() { 
      if( navigator.userAgent.match(/Android/i)
        || navigator.userAgent.match(/webOS/i)
        || navigator.userAgent.match(/iPhone/i)
        || navigator.userAgent.match(/iPad/i)
        || navigator.userAgent.match(/iPod/i)
        || navigator.userAgent.match(/BlackBerry/i)
        || navigator.userAgent.match(/Windows Phone/i)
      ){
        return true;
      }else {
        return false;
      }
    }

    if (detectmob()) {
      $scope.mobile = true;
      $scope.mobileNavSearchToggle = false;
    } else {
      $scope.mobile = false;
      $scope.mobileNavSearchToggle = false;
    }

    $scope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
      if (toState.url === '/feed') {
        $scope.feedPage = true;
      } else {
        $scope.feedPage = false;
      }

      $scope.scrolled = false;

      $scope.page = toState.url;
      if (!$scope.mobile) {
        if (toState.url === '/') {
          document.getElementById("navBar").style.backgroundColor = "transparent";
          [].forEach.call(document.getElementsByClassName("nav-link"), function (el) {
              el.style.color = "#ffffff";
          });

          function myFunction() {
            if (document.body.scrollTop > 435) {
              document.getElementById("navBar").style.backgroundColor = "#ffffff";
              [].forEach.call(document.getElementsByClassName("nav-link"), function (el) {
                  el.style.color = "#000000";
              });

              $scope.$apply(function () {
                $scope.feedPage = true;
              });
            } else {
              document.getElementById("navBar").style.backgroundColor = "transparent";
              [].forEach.call(document.getElementsByClassName("nav-link"), function (el) {
                  el.style.color = "#ffffff";
              });

              $scope.$apply(function () {
                $scope.feedPage = false;
              });
            }
          };

          window.onscroll = function() { myFunction() };
        } else {
          window.onscroll = undefined;
          document.getElementById("navBar").style.backgroundColor = "#ffffff";
          [].forEach.call(document.getElementsByClassName("nav-link"), function (el) {
              el.style.color = "#000000";
          });
        }
      }
    });

    // $scope.gotoAnchor = function(id) {
    //   var newHash = id;
    //   if ($location.hash() !== newHash) {
    //     // set the $location.hash to `newHash` and
    //     // $anchorScroll will automatically scroll to it
    //     $location.hash(newHash);
    //   $scope.$anchorScroll;
    //   } else {
    //     // call $anchorScroll() explicitly,
    //     // since $location.hash hasn't changed
    //     $anchorScroll();
    //   }
    // };

    vm.userDS = userDataService;

    $scope.loadNavTags = function(query) {
      var queryArray = query.split(' ').reverse();
      var queryString = '';
      var l = queryArray.length;
      while (l--) {
        queryString += queryArray[l].slice(0,1).toUpperCase() + queryArray[l].slice(1).toLowerCase() + ' ';
      }

      return $http.get('/api/celebrities/tags?query=' + queryString);
    };

    $scope.clearFeed = function () {
      var l = $scope.tags.length;
      while (l--) {
        feedService.removeFeed($scope.tags[l].system);
      }

      $scope.tags = feedService.resetTags();
    };

    // if there is a systemname,
    //  the user clicked on an image or tweet
    // if there isnt a systemname,
    //  the user clicked the search button
    $scope.loadFeed = function (systemname) {
      if (systemname) {
        feedService.addFeed(systemname);
        $scope.tags.push({
          text: celebritiesPretty[systemname],
          system: systemname
        });
      }

      $location.url('/feed');
    };

    $http.get('/api/trending').then(function (results) {
      $scope.trending = results.data;
      console.log('trending');
      console.log($scope.trending);
    });

    $http.get('/api/mostRecent').then(function (results) {
      $scope.mostRecent = results.data;
      console.log('most recent');
      console.log($scope.mostRecent);
    });

    $http.get('/api/instagram/home').then(function (results) {
      $scope.instagramHome = results.data;
      console.log('instagram');
      console.log($scope.instagramHome);
    });

    $http.get('/api/twitter/home').then(function (results) {
      $scope.twitterHome = results.data;
      console.log('twitter');
      console.log($scope.twitterHome);
    });

    $http.get('/api/youtube/home').then(function (results) {
      $scope.youtubeHome = results.data;
      console.log('youtube');
      console.log(results.data);
    });

    $http.get('/api/celebrities/list').then(function (results) {
      $scope.celebrities = results.data;

      var celebrity;
      var l = $scope.celebrities.length;
      while(l--) {
        celebrity = $scope.celebrities[l];
        celebritiesPretty[celebrity.system] = celebrity.pretty;
      }
    });

    $('.carousel').carousel({
      interval: 3000 //changes the speed
    });

    $(".hover").hover(function () {
      $(this).find(".overlay").fadeIn();
    }, function () {
      $(this).find(".overlay").fadeOut();
    });
  }
})();
