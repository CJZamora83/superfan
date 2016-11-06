(function() {
  'use strict';

  angular.module('superfanApp')
  .controller('FeedController', FeedController);

  FeedController.$inject = ['$scope', '$http', 'twitterDataService'];

  function FeedController($http, $scope, twitterDataService) {
    var vm = this;

    // twitterDataService.jwt();
  }

})();
