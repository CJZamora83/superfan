(function() {
  "use strict";

  angular
  .module("superfanApp")
  .controller("LoginController", LoginController);

LoginController.$inject = [];

function LoginController(){
  var vm = this;

  // vm.login = login;
  // vm.isLoggedIn = authService.isLoggedIn;
  // vm.currentUser = userDataService;

  //form data for login
  // vm.loginData;

  function venueLogin() {
    // authService.login(vm.loginData.email, vm.loginData.password)
      // .then(function(res) {
      //   $log.log(res.data);
      //   $state.go();
      // });
  }
}
})();
