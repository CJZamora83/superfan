(function() {
  angular.module('superfanApp', [
    "ui.router", 'satellizer'
    ])

    .config(function($httpProvider, $authProvider) {
      $authProvider.google({
        clientId: '677194163417-e9c4jbgpen9vrqbn6btsf45dcvpjqjve.apps.googleusercontent.com',
        // responseType: 'token'
      });
    });
    //   // attach our auth interceptor to the http requests
    //   $httpProvider.interceptors.push('authInterceptor');
    // })

    // .run(['authService', function(authService){
    //   if (authService.isLoggedIn()) authService.setUser();
    // }]);


})();
