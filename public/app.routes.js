(function() {
  "use strict";

  angular
    .module("superfanApp")
    .config(AppRoutes);

  AppRoutes.$inject = ["$stateProvider", "$urlRouterProvider", "$authProvider"];

  function AppRoutes($stateProvider, $urlRouterProvider, $authProvider) {
    $stateProvider
      .state("homePage", {
        url: "/",
        templateUrl: "/templates/landing.html",
      })
      .state("user_login", {
        url: "/user_login",
        templateUrl: "/templates/user_login.html",
        controller: "LoginController",
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
