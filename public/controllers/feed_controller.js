(function() {
  'use strict';

  angular.module('superfanApp')
  .controller('FeedController', FeedController);

  FeedController.$inject = ['$scope', '$http', '$location', 'twitterDataService'];

  function FeedController($scope, $http, $location, twitterDataService) {
    var vm = this;
    $scope.dataLoaded = false;

    // the jwt runs once everytime the server loads so you shouldnt ever have to worry about it
    // otherwise, if it seems like the token isnt set, hit twitterDataService.jwt() and that will
    // reset the token on the backend

    // change it to be whatever you want (remember to change the html), i tried to chose one that
    // had recent tweets... annnd im a liverpool fc fan, also if you'd rather
    // you can give this method a callback instead of doing the timeout
    // and grabbing the results that you see after this, whatever you like best
    var keyword = 'LFC'
    twitterDataService.search(keyword);

    setTimeout(function () {
      var searchResults = twitterDataService.getSearchResults();

      $scope.results = searchResults[keyword];

      $scope.dataLoaded = true;

      // dont need to $apply if you use the callback i believe
      $scope.$apply();
    }, 1000);


    // this is for user oauth stuff, figured id leave it here for you to see
    // but ultimately i figured we'd have twitterDataService.oauth() trigger when the user clicks certain
    // things, like retweets or likes but i feel like thats a little further down
    // the line

    // if ($location.$$search.oauth_token_secret) {
    //   console.log($location.$$search)
    // } else {
    //   twitterDataService.oauth()
    // }
  }



})();
