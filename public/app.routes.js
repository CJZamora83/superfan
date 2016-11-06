(function() {
  "use strict";

  angular
    .module("superfanApp")
    .config(AppRoutes);

  AppRoutes.$inject = ["$stateProvider", "$urlRouterProvider", "$authProvider", "$locationProvider"];

  function AppRoutes($stateProvider, $urlRouterProvider, $authProvider, $locationProvider) {
    $stateProvider
      .state("homePage", {
        url: "/",
        templateUrl: "/templates/landing.html",
      })

      .state("userLogin", {
        url: "/user_login",
        templateUrl: "/templates/user_login.html",
        controller: "UserLoginController",
        controllerAs: "vm"
      })
      .state("user_home", {
        url: "/user_home",
        templateUrl: "/templates/user_home.html",
        controller: "UsersController",
        controllerAs: "vm"
      })
      .state("twitter", {
        url: "/twitter",
        templateUrl: "/templates/twitter.html",
        controller: "FeedController",
        controllerAs: "vm"
      })

    $urlRouterProvider.otherwise("/");
  }
})();
