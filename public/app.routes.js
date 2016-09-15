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

    $authProvider.instagram({
      clientId: "ebbedcbd196949a3848d793d4a3dd4f3"
    })
  }


})();
