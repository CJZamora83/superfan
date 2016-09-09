(function() {
  angular.module('VirtApp')
    .controller('UserLoginController', function($scope, $auth, $state, userDataService) {

      $scope.authenticate = function(provider) {
        if (!$auth.isAuthenticated()) {
          $auth.authenticate(provider).then(function(res) {
            userDataService.user = res.data.user;
            $state.go('user_home');
          });
        }
      };
    });
})();
