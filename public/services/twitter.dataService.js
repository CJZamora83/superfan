(function() {
  'use strict';

  angular
    .module('superfanApp')
    .factory('twitterDataService', twitterDataService);

  twitterDataService.$inject = ['$http'];

  function twitterDataService($http) {
    var service = {};

    service.jwt = jwt;

    function jwt() {
      return $http
        .get('/api/jwt/twitter').then(function(res) {
          console.log(res);
        }, function(err) {
          console.log(err);
        })
    }


    // twitter search api


    return service;
  }

})();
