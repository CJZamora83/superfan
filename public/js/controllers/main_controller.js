(function() {
  "use strict";

    angular
      .module("superfanApp")
      .controller("MainController", MainController);

  MainController.$inject = ['$scope','userDataService', '$auth', '$state', '$http', 'feedService', '$location'];

  function MainController($scope, userDataService, $auth, $state, $http, feedService, $location, $route) {
    var vm = this;
    var celebritiesPretty = {};
    $scope.feedPage = false;
    $scope.tags = feedService.getTags();
    $scope.feedService = feedService;
    $scope.scrolled = false;
    $scope.mobile = false;
    $scope.mobileNavSearchToggle = false;

    if (window.innerWidth > 750) {
      $scope.mobile = false;
      $scope.mobileNavSearchToggle = false;
    }
     else if (window.innerWidth <= 750) {
      $scope.mobile = true;
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
            if (document.body.scrollTop > 720) {
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
    });

    $http.get('/api/mostRecent').then(function (results) {
      $scope.mostRecent = results.data;
    });

    $http.get('/api/instagram/home').then(function (results) {
      $scope.instagramHome = results.data;
    });

    $http.get('/api/twitter/home').then(function (results) {
      $scope.twitterHome = results.data;
      console.log($scope.twitterHome);
    });

    $http.get('/api/youtube/home').then(function (results) {
      $scope.youtubeHome = results.data;
      console.log(results.data)
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

    vm.isLoggedIn = function() {
      return $auth.isAuthenticated();
    };

    vm.logout = function() {
      $auth.logout();
      $state.go('homePage');
    };
  }
})();
