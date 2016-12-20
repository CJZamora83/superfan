(function() {
  'use strict';

  angular.module('superfanApp')
  .controller('FeedController', FeedController);

  FeedController.$inject = ['$scope', '$http', '$location', 'twitterDataService'];

  function FeedController($scope, $http, $location, twitterDataService) {
    var vm = this;

    // make these random
    // $scope.tags = [
    //   {
    //     systemname: 'drake',
    //     text: 'Drake'
    //   },
    //   // { text: 'Beyonce & Jay Z' }
    //   // { text: 'Mel Gibson & Morgan Freeman' },
    //   {
    //     systemname: 'kyliejenner',
    //     text: 'Kylie Jenner'
    //   }
    // ];

    $scope.loadTags = function() {
      return $http.get('/api/tags/celebrities');
    }

    // $scope.$watch('tags.length', function (v, old) {
    //   console.log($scope.tags);
    // })
  }
})();
