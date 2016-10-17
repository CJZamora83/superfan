(function() {
  'use strict';

  angular
    .module('superfanApp')
    .factory('twitterDataService', twitterDataService);

  twitterDataService.$inject = ['$http'];

  function twitterDataService($http) {
    var service = {};

    service.getBearerToken = getBearerToken;

    function getBearerToken() {
      return $http
        .post('/api/twitter').then(function(res) {
          console.log(res);
        }, function(err) {
          console.log(err);
        })
    }


    // twitter search api


    return service;
  }

})();
