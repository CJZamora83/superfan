(function() {
  'use strict';

  angular
    .module('superfanApp')
    .factory('twitterDataService', twitterDataService);

  twitterDataService.$inject = ['$http'];

  function twitterDataService($http) {
    var service = {};
    var results = {};

    service.jwt = jwt;
    service.oauth = oauth;
    service.search = search;
    service.invalJwt = invalJwt;
    service.getSearchResults = getSearchResults;

    function jwt() {
      return $http
        .get('/api/jwt/twitter').then(function(res) {
          console.log(res);
        }, function(err) {
          console.log(err);
        });
    };

    function oauth(body) {
      return $http
        .get('/api/auth/twitter').then(function(res) {
          if (typeof res.data === 'string') {
            window.location = 'https://api.twitter.com/oauth/authorize?' + res.data;
          } else {
            console.log(res);
          }
        }, function(err) {
          console.log(err);
        });
    };

    // you can either call the getSearchResults method or use a callback to
    // get the results
    function search(keyword, callback) {
      return $http.get('/api/search/twitter/' + keyword).then(function(res) {
        results[keyword] = JSON.parse(res.data.results);

        if (callback) {
          callback(JSON.parse(res.data.results));
        }
      }, function(err) {
        console.log(err);
      });
    };

    function invalJwt() {
      return $http
        .get('/api/invaljwt/twitter').then(function(res) {
          console.log(res);
        }, function(err) {
          console.log(err);
        });
    };

    function getSearchResults() {
      return results;
    };

    return service;
  };

})();
