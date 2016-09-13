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
      .state("signup", {
        url: "/venue_register",
        templateUrl: "/templates/venue_register.html",
        controller: "VenuesController",
        controllerAs: "vm"
      })
      .state("venue_login", {
        url: "/venue_login",
        templateUrl: "/templates/venue_login.html",
        controller: "VenuesController",
        controllerAs: "vm"
      })
      .state("venue_home", {
        url: "/venue_home",
        templateUrl: "/templates/venue_home.html",
        controller: "VenuesController",
        controllerAs: "vm"
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
    $urlRouterProvider.otherwise("/");


    $authProvider.facebook({
      clientId: '270126770028870'
    });
  }
})();
