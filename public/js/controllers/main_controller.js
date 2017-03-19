(function() {
  "use strict";

    angular
      .module("superfanApp")
      .controller("MainController", MainController);

  MainController.$inject = ['$scope','userDataService', '$auth', '$state', '$http', 'feedService', '$location'];

  function MainController($scope, userDataService, $auth, $state, $http, feedService, $location) {
    var vm = this;
    $scope.feedPage = false;
    $scope.tags = feedService.getTags();
    $scope.feedService = feedService;
    $scope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
      if (toState.url === '/feed') {
        $scope.feedPage = true;
      } else {
        $scope.feedPage = false;
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

    // if there is a systemname,
    //  the user clicked on an image or tweet
    // if there isnt a systemname,
    //  the user clicked the search button
    $scope.loadFeed = function (systemname, prettyname) {
      if (systemname) {
        feedService.addFeed(systemname);
        // var l = $scope.celebrities.length;
        // while (l--) {

        // }
        // $scope.tags.push({
        //   text: pretty,
        //   system: systemname
        // });
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
    });

    $http.get('/api/youtube/home').then(function (results) {
      $scope.youtubeHome = results.data;
    });

    $http.get('/api/celebrities/list').then(function (results) {
      $scope.celebrities = results.data;
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
