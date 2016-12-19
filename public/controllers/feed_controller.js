(function() {
  'use strict';

  angular.module('superfanApp')
  .controller('FeedController', FeedController);

  FeedController.$inject = ['$scope', '$http', '$location', 'twitterDataService'];

  function FeedController($scope, $http, $location, twitterDataService) {
    var vm = this;

    // make these random
    $scope.tags = [
      { text: 'Drake' },
      { text: 'Beyonce & Jay Z' },
      { text: 'Mel Gibson & Morgan Freeman' },
      { text: 'Jennifer Lawrence' }
    ];

    $scope.loadTags = function(query) {
      return $http.get('/api/celebrities/tags?query=' + query);
    };
  }



})();
