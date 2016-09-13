(function() {
  "use strict";

    angular
      .module("superfanApp")
      .controller("MainController", MainController);

  MainController.$inject = ['userDataService', '$auth', '$state'];

  function MainController(userDataService, $auth, $state) {
    var vm = this;

    vm.userDS = userDataService;

    vm.isLoggedIn = function() {
      return $auth.isAuthenticated();
    };

    vm.logout = function() {
      $auth.logout();
      $state.go('homePage');
    };
  }
})();
