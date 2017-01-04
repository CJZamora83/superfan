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
        controller: "CarouselCtrl",
        controllerAs: "vm"
      })
      .state("user_login", {
        url: "/user_login",
        templateUrl: "/templates/user_login.html",
        controller: "LoginController",
        controllerAs: "vm"
      })
      .state("feed", {
        url: "/feed",
        templateUrl: "/templates/feed.html",
        controller: "FeedController",
        controllerAs: "vm"
      })

    $urlRouterProvider.otherwise("/");
  }
})();
