(function() {
  "use strict";

  angular
    .module("superfanApp")
    .config(AppRoutes);

  AppRoutes.$inject = ["$stateProvider", "$urlRouterProvider"];

  function AppRoutes($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state("home", {
        url: "/",
        templateUrl: "/templates/home.html",
      })
      .state("aboutPage", {
        url: "/about",
        templateUrl:  "/templates/about.html"
      })
      .state("login", {
        url: "/login",
        templateUrl: "/templates/login.html",
        controller: "UsersController",
        controllerAs: "vm"
      });

    $urlRouterProvider.otherwise("/");
  }

})();
