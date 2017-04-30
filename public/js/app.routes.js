(function() {
  "use strict";

  angular
    .module("superfanApp")
    .config(AppRoutes);

  AppRoutes.$inject = ["$stateProvider", "$urlRouterProvider", "$authProvider", '$locationProvider'];

  function AppRoutes($stateProvider, $urlRouterProvider, $authProvider, $locationProvider) {
    var homeTemplate = "/html/home.html";
    var feedTemplate = "/html/feed.html";
    // if (window.innerWidth > 400) {
    //   homeTemplate = "/html/home.html";
    //   feedTemplate = "/html/feed.html";
    // } else if (window.innerWidth <= 400) {
    //   homeTemplate = "/html/mobile_home.html";
    //   feedTemplate = "/html/mobile_feed.html";
    // }

    $stateProvider
      .state("homePage", {
        url: "/",
        templateUrl: homeTemplate,
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
        templateUrl: feedTemplate,
        controller: "FeedController",
        controllerAs: "vm"
      })

    $urlRouterProvider.otherwise("/");
  }
})();
