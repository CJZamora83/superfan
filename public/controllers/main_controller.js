(function() {
  "use strict";

    angular
      .module("superfanApp")
      .controller("MainController", MainController);

  MainController.$inject = ['userDataService', '$auth', '$state', '$http'];

  function MainController(userDataService, $auth, $state, $http) {
    var vm = this;

    vm.userDS = userDataService;

    // make these random
    // vm.tags = [
    //   { text: 'Drake' },
    //   { text: 'Beyonce & Jay Z' },
    //   { text: 'Mel Gibson & Morgan Freeman' },
    //   { text: 'Jennifer Lawrence' }
    // ];

    // vm.loadTags = function() {
      // $http.get('/api/tags/celebrities', function (results) {
      //   console.log(results);
      // });
    // };

    vm.isLoggedIn = function() {
      return $auth.isAuthenticated();
    };

    vm.logout = function() {
      $auth.logout();
      $state.go('homePage');
    };
  }
})();
