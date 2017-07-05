(function() {
  'use strict';

  angular.module('superfanApp')
  .controller('FeedController', FeedController);

  FeedController.$inject = ['$scope', '$http', '$location', 'twitterDataService', 'feedService'];

  function FeedController($scope, $http, $location, twitterDataService, feedService) {
    var vm = this;
    $scope.activeBrick = {};
    $scope.modalShown = false;
    $scope.brickLimit = 50;
    $scope.tags = feedService.getTags();
    $scope.feed = feedService.feed;
    $scope.sortSelect = 'most recent';
    var ready = true;

    if (!$scope.mobile) {
      $('.grid').imagesLoaded(function() {
        $('.grid').masonry('layout');
      });
    }

    $scope.openModal = function (brick) {
      $scope.activeBrick = brick;
      console.log($scope.activeBrick)
      $scope.modalShown = true;
    };

    $scope.closeModal = function () {
      $scope.activeBrick = {};
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
