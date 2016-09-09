(function() {
  "use strict";

  angular
    .module("superfanApp")
    .config(AppRoutes);

  AppRoutes.$inject = ["$stateProvider", "$urlRouterProvider"];

  function AppRoutes($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state("homePage", {
        url: "/",
        templateUrl: "/templates/superfan.html"
      })
      .state("aboutPage", {
        url: "/about",
        templateUrl:  "/templates/about.html"
      })
      .state("userLogin", {
        url: "/user_login",
        templateUrl: "/templates/user_login.html",
        controller: "UserLoginController",
        controllerAs: "vm"
      })

    $urlRouterProvider.otherwise("/");
  }


})();
