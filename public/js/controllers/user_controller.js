(function() {
  "use strict";

  angular
  .module("superfanApp")
  .controller("UsersController", UsersController);

  UsersController.$inject = ["$state", 'userDataService'];

  function UsersController($state, userDataService) {
    var vm = this;

    vm.userDS = userDataService;

  }

})();
