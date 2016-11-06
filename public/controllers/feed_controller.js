(function() {
  'use strict';

  angular.module('superfanApp')
  .controller('FeedController', FeedController);

  FeedController.$inject = ['$scope', '$http', '$location', 'twitterDataService'];

  function FeedController($scope, $http, $location, twitterDataService) {
    var vm = this;

    // console.log($location.$$search.oauth_token);
    if ($location.$$search.oauth_token_secret) {
      console.log($location.$$search)
    } else {
      twitterDataService.oauth()
    }

    // setTimeout(function () {
    //   twitterDataService.search('drake');
    // }, 2000);
  }

})();
