(function() {
  "use strict";

  angular
    .module("superfanApp")
    .config(AppRoutes);

  AppRoutes.$inject = ["$stateProvider", "$urlRouterProvider", "$authProvider", '$locationProvider'];

  function AppRoutes($stateProvider, $urlRouterProvider, $authProvider, $locationProvider) {
    $stateProvider
      .state("homePage", {
        url: "/",
        templateUrl: "/html/home.html",
        controller: "CarouselCtrl",
        controllerAs: "vm"
      })
      .state("user_login", {
        url: "/user_login",
        templateUrl: "/html/user_login.html",
        controller: "LoginController",
        controllerAs: "vm"
      })
      .state("feed", {
        url: "/feed",
        templateUrl: "/html/feed.html",
        controller: "FeedController",
        controllerAs: "vm"
      })

    $urlRouterProvider.otherwise("/");
  }
})();
