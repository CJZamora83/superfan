(function() {
  'use strict';

  angular.module('superfanApp')
  .controller('FeedController', FeedController);

  FeedController.$inject = ['$scope', '$http', '$location', 'twitterDataService', 'feedService'];

  function FeedController($scope, $http, $location, twitterDataService, feedService) {
    var vm = this;
    $scope.feed = feedService.feed;
    $scope.brickLimit = 50;
    $scope.tags = feedService.getTags();

    $(window).scroll(function() {
      if($(window).scrollTop() > (($(document).height() - $(window).height()) - 300) && ($scope.feed.length >= $scope.brickLimit)) {
        // ajax call get data from server and append to the div
        $scope.$apply(function () {
          $scope.brickLimit += 30;
        })
      }
    })
  }
})();
