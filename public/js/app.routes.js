(function() {
  "use strict";

  angular
    .module("superfanApp")
    .config(AppRoutes);

  AppRoutes.$inject = ["$stateProvider", "$urlRouterProvider", '$locationProvider'];

  function AppRoutes($stateProvider, $urlRouterProvider, $locationProvider) {
    var homeTemplate = "/html/home.html";
    var feedTemplate = "/html/feed.html";
    function detectmob() { 
      if( navigator.userAgent.match(/Android/i)
        || navigator.userAgent.match(/webOS/i)
        || navigator.userAgent.match(/iPhone/i)
        || navigator.userAgent.match(/iPad/i)
        || navigator.userAgent.match(/iPod/i)
        || navigator.userAgent.match(/BlackBerry/i)
        || navigator.userAgent.match(/Windows Phone/i)
      ){
        return true;
      }else {
        return false;
      }
    }

    if (detectmob()) {
      homeTemplate = "/html/mobile_home.html";
      feedTemplate = "/html/mobile_feed.html";
    } else {
      homeTemplate = "/html/home.html";
      feedTemplate = "/html/feed.html";
    }

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
