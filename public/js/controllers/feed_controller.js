(function() {
  'use strict';

  angular.module('superfanApp')
  .controller('FeedController', FeedController);

  FeedController.$inject = ['$scope', '$http', '$location', 'twitterDataService', 'feedService'];

  function FeedController($scope, $http, $location, twitterDataService, feedService) {
    var vm = this;
    console.log(feedService.feed);
    $scope.feed = feedService.feed;
  }
})();
