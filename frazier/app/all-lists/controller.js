'use strict';
/*global angular */



(function(){
  angular.module('allLists', [])
    .controller('AllListsController', ['$http', '$scope', '$log', AllListsController]);

  function AllListsController($http, $scope, $log){
    const vm                    = this;
    vm.addListFormVisible       = false;
    vm.postError                = null;
    vm.addListName              = null;
    vm.addListDescription       = null;
    vm.addButtonText            = 'Make a new list';
    
    vm.toggleAddListFormVisible = toggleAddListFormVisible;
    vm.addListFormHandler       = addListFormHandler;  
    
    function toggleAddListFormVisible() {
      // $log.log('toggleAddListFormVisible');
      if(vm.addListFormVisible){
        vm.addListFormVisible   = false; 
        vm.addButtonText        = 'Make a new list';
      } else {
        vm.addListFormVisible   = true;
        vm.addButtonText        = 'Cancel';
      }
    }
    
    
    //__________________________________________________________________
    //ADD LIST METHODS
    //__________________________________________________________________
    function addListFormHandler() {
      // $log.log('addListFormHandler');
      let postObj = {name: vm.addListName, description: vm.addListDescription};
      $log.log(postObj);
      $http.post('http://localhost:3000/lists', postObj)
        .then((result) => {
          vm.postError = null;
          $scope.initialize(function(err){
            if (err) {
              $log.log('err was ', err);
              vm.postError = 'Error creating list.';
            } else {
              vm.addListFormVisible = false;
              $log.log('result was ', result);
              $scope.listIdForEditSection = result.data._id.toString();
              $scope.toggleTab($scope.listIdForEditSection);
            }
          });
        }, function(err) {
          $log.log('err was ' + err);
          vm.postError = 'Error creating list.';
        });
    }
  }
  
})();
