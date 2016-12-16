(function() {
  angular.module('superfanApp', [
    "ui.router", 'satellizer', 'ngTagsInput'
    ])

    .config(function($httpProvider, $authProvider) {
      $authProvider.instagram({
      clientId: 'ebbedcbd196949a3848d793d4a3dd4f3'
      });
    });



})();
