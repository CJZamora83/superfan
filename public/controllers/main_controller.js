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

    $scope.loadNavTags = function() {
      return $http.get('/api/celebrities/tags');
    }

    // $http.get('/api/celebrities/tags').then(function (results) {
    //   console.log(results)
    // })

    vm.isLoggedIn = function() {
      return $auth.isAuthenticated();
    };

    vm.logout = function() {
      $auth.logout();
      $state.go('homePage');
    };
  }
})();
