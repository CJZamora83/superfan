(function() {
  'use strict';

  angular.module('superfanApp')
  .controller('FeedController', FeedController);

  FeedController.$inject = ['$http', 'twitterDataService'];

  function FeedController($http, twitterDataService) {
    var vm = this;

    twitterDataService.getBearerToken();


  }

})();
