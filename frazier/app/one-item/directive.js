'use strict';
/*global angular */


(function() {
  angular.module('oneItem', [])
    .directive('oneItem', oneItem);
  
  function oneItem(){
    return {
      restrict: 'E',
      templateUrl: 'one-item.html',
      scope: {
        item: '=', 
        toggleTab: '&'
      },
      controller: ['$http', '$scope', '$log', ItemCtrl], 
      controllerAs: 'itemCtrl'
    };
  }
  
  function ItemCtrl($http, $scope, $log) {
    const vm = this;
    //controls whether the form or summary is visable
    vm.editItemFormVisible        = false;
    //this is the copy that edits get made to 
    vm.itemCopy                   = null;
    //attach methods to the scope
    vm.initialize                 = initialize;
    vm.toggleEditItemFormVisible  = toggleEditItemFormVisible;
    vm.updateLocalItemAfterPut    = updateLocalItemAfterPut;
    vm.editItemFormHandler        = editItemFormHandler;
    vm.deleteItemFormHandler      = deleteItemFormHandler;
    //text of buttons whose text changes
    vm.editItemButtonText         = 'Edit or delete this item.';
    vm.deleteItemButtonText       = 'Delete.';
    
    
    
    
    function initialize() {
      vm.itemCopy = angular.copy($scope.item);
    }
    
    
    
    //__________________________________________________________________
    //EDIT ITEM METHODS
    //__________________________________________________________________
    function toggleEditItemFormVisible() {
      if(vm.editItemFormVisible){
        vm.editItemFormVisible    = false;
        vm.editItemButtonText     = 'Edit or delete this item.';
      } else {
        vm.editItemFormVisible    = true;
        vm.editItemButtonText     = 'Cancel';
      }
    }
    function editItemFormHandler() {
      let postObj = {};
      postObj.name = vm.itemCopy.name;
      if(vm.itemCopy.description) {
        postObj.description = vm.itemCopy.description;
      }
      if(vm.itemCopy.dueDate) {
        postObj.dueDate = vm.itemCopy.dueDate;
      }
      if(vm.itemCopy.complete) {
        postObj.complete = vm.itemCopy.complete;
      }

      $http.put('http://localhost:3000/items/' + $scope.item._id, postObj)
        .then(function(result) {
          vm.editItemButtonText = 'Edit or delete this item.';
          vm.editItemFormVisible = false;
          $log.log(result.data);
          $scope.item = result.data;
          vm.updateLocalItemAfterPut();
        }, function(err) {
          $log.log('Error updating item: ', err);
        });
    }
    function updateLocalItemAfterPut (){
      $scope.item.name = vm.itemCopy.name;
      if(vm.itemCopy.description) {
        $scope.item.description = vm.itemCopy.description;
      }
      if(vm.itemCopy.dueDate) {
        $scope.item.dueDate = vm.itemCopy.dueDate;
      }
      if(vm.itemCopy.complete) {
        $scope.item.complete = vm.itemCopy.complete;
      }
    }
    
    
    function deleteItemFormHandler() {
      if(vm.deleteItemButtonText === 'Click again to confirm item deletion.') {
        deleteItem();
      } else {
        confirmDeleteItem();
      }
    }
    function confirmDeleteItem() {
      vm.deleteItemButtonText = 'Click again to confirm item deletion.';
    }
    function deleteItem() {
      vm.deleteItemButtonText = 'Delete.';
      $http.delete('http://localhost:3000/items/' + $scope.item._id)
        .then(function(result) {
          vm.editItemFormVisible = false;
          $scope.item = null; //will this work?
          //do stuff locally not with api call
        }, function(err) {
          $log.log('Error deleting item: ', err);
        });
    }
    
    
  }
  
  
  
  
  
})();
