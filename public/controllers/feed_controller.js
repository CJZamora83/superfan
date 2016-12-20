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

    $http.get('/api/celebrities/list').then(function (results) {
      console.log('all celebrity objects or contact cards if you like');
      console.log(results);
    });

    $http.get('/api/instagram/list').then(function (results) {
      console.log('all instagram posts. there is also a search route for this api, it is "/api/instagram/search?search=*the systemname of the celebrity you want data from *"');
      console.log(results);
    });

    $http.get('/api/twitter/list').then(function (results) {
      console.log('all tweets. also, same as instagram, there is a search route for this api, works the same way, send the systemname (found on the celebrity object) of the celebrity you want data for');
      console.log(results);
    });

    $scope.loadTags = function() {
      return $http.get('/api/celebrities/tags');
    }

    $scope.$watch('tags.length', function (v, old) {
      console.log($scope.tags);
    })
  }
})();
