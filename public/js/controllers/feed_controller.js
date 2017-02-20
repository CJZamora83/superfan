(function() {
  'use strict';

  angular.module('superfanApp')
  .controller('FeedController', FeedController);

  FeedController.$inject = ['$scope', '$http', '$location', 'twitterDataService', 'feedService'];

  function FeedController($scope, $http, $location, twitterDataService, feedService) {
    var vm = this;
    $scope.feed = feedService.feed;
    $scope.brickLimit = 50;

    console.log($scope.feed);
    // $(window).scroll(function() {
    //   console.log('scroll height')
    //   console.log($(window).scrollTop())
    //   console.log('page scrolled')
    //   console.log(($(document).height() - $(window).height()) - 300);
    //   console.log('brick limit')
    //   console.log($scope.brickLimit);
    //   if($(window).scrollTop() > (($(document).height() - $(window).height()) - 300)) {
    //     // ajax call get data from server and append to the div
    //     console.log('hit');
    //     $scope.brickLimit += 30;
    //   }
    // })
  }
})();
