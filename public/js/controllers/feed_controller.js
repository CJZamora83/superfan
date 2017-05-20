(function() {
  'use strict';

  angular.module('superfanApp')
  .controller('FeedController', FeedController);

  FeedController.$inject = ['$scope', '$http', '$location', 'twitterDataService', 'feedService'];

  function FeedController($scope, $http, $location, twitterDataService, feedService) {
    var vm = this;
    $scope.activeYoutubeVideo = '';
    $scope.modalShown = false;
    $scope.brickLimit = 50;
    $scope.tags = feedService.getTags();
    $scope.feed = feedService.feed;
    var ready = true;

    if (!$scope.mobile) {
      $('.grid').imagesLoaded(function() {
        $('.grid').masonry('layout');
      });
    }

    $scope.openYoutubeModal = function (video) {
      $scope.activeYoutubeVideo = video;
      $scope.modalShown = !$scope.modalShown;
    };

    $scope.closeYoutubeModal = function () {
      $scope.activeYoutubeVideo = '';
      $scope.modalShown = false;
    };

    $(window).scroll(function() {
      if($(window).scrollTop() > (($(document).height() - $(window).height()) - 2500) && ($scope.feed.length >= $scope.brickLimit) && ready) {
        ready = false;
        $scope.$apply(function () {
          $scope.brickLimit += 50;
          setTimeout(function () {
            $('.grid').imagesLoaded(function() {
              $('.grid').masonry('layout');
              setTimeout(function () {
                ready = true;
              }, 5000);
            });
          });
        })
      }
    })
  }
})();
