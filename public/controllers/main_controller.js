(function() {
  "use strict";

    angular
      .module("superfanApp")
      .controller("MainController", MainController);

  MainController.$inject = ['$scope','userDataService', '$auth', '$state', '$http'];

  function MainController($scope, userDataService, $auth, $state, $http) {
    var vm = this;

    vm.userDS = userDataService;

    // make these random
    // vm.tags = [
    //   { text: 'Drake' },
    //   { text: 'Beyonce & Jay Z' },
    //   { text: 'Mel Gibson & Morgan Freeman' },
    //   { text: 'Jennifer Lawrence' }
    // ];

    $scope.loadNavTags = function(query) {
      var queryArray = query.split(' ').reverse();
      var queryString = '';
      var l = queryArray.length;
      while (l--) {
        queryString += queryArray[l].slice(0,1).toUpperCase() + queryArray[l].slice(1).toLowerCase() + ' ';
      }

      return $http.get('/api/celebrities/tags?query=' + queryString);
    }

    // $http.get('/api/celebrities/tags').then(function (results) {
    //   console.log(results)
    // })

    $scope.onTagAdd = function ($tag) {
      $http.get('/api/search?search=' + $tag.text).then(function (results) {
        console.log(results);
      });
    }

    $http.get('/api/trending').then(function (results) {
      $scope.trending = results.data;
    });

    $http.get('/api/mostRecent').then(function (results) {
      $scope.mostRecent = results.data;
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
