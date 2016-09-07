(function() {
  angular.module('superfanApp', [
    "ui.router", 'satellizer'
    ])

    .config(function($httpProvider, $authProvider) {
      $authProvider.google({
        clientId: 'ebbedcbd196949a3848d793d4a3dd4f3',
        // responseType: 'token'
      });
    });

})();
