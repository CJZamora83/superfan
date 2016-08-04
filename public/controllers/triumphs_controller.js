(function() {
  "use strict";

  angular
      .module("fishinApp")
      .controller("TriumphsController", TriumphsController);

  TriumphsController.$inject = ["$state", "userDataService", "$log", "$http"];

  function TriumphsController($state, userDataService, $log, $http) {
    var vm = this;

    vm.user = userDataService.user;

    vm.fishes = [];

    vm.newFish = {
      name: "",
      category: ""
    };

    vm.editFish = {
      name: "",
      category: ""
    }

    vm.getFishes     = getFishes;
    vm.deleteFish    = deleteFish;
    vm.updateFish    = updateFish;
    vm.postFish      = postFish;
    vm.resetEditForm = resetEditForm;

    vm.getFishes();

    function getFishes() {
      $http.get('/api/fishes').then(function(response) {
        vm.fishes = response.data;
      }, function(errRes) {
        console.error('Error catchin fish!', errRes);
      });
    }

    function deleteFish(id) {
      $http.delete('/api/fishes/' + id).then(function(response) {
        console.log(response);
      }, function(errRes) {
        console.error('Error deletin fish!', errRes);
      }).then(getFishes);
    }

    function postFish() {
      $http.post('/api/fishes', vm.newFish)
        .then(getFishes)
        .then(function(response) {
          vm.newFish = {
            name: "",
            category: ""
          };
        });
    }

    function updateFish(id) {
      $http.put('/api/fishes/' + id, vm.editFish).then(function(response) {
        vm.editFish = {
          name: "",
          category: ""
        };
      }, function(errRes) {
        console.log('Error fixin fish!', errRes);
      }).then(getFishes);
    }

    function resetEditForm() {
      vm.fishCategory = '';
      vm.fishName = '';
      vm.editFish = {
        name: "",
        category: ""
      };
    }

  }

})();
