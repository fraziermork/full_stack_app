'use strict';
/*global angular */



(function(){
  angular.module('oneList', [])
    .controller('EditListController', ['$http', '$scope', '$log', EditListController]);
  
  function EditListController($http, $scope, $log){
    const vm                      = this;
    //Flags for whether to show the forms 
    vm.addItemFormVisible         = false;
    vm.editListFormVisible        = false;
    //Data that will come in from the API
    vm.result                     = {};
    vm.list                       = [];
    vm.listCopy                   = [];
    vm.editListError              = null;
    //Button text for buttons whose text will change 
    vm.addItemButtonText          = 'Add an item to this list.';
    vm.editListButtonText         = 'Edit or delete this list.';
    vm.deleteListButtonText       = 'Delete this list.';
    //Possible properties for an item to post
    vm.addItemName                = null;
    vm.addItemDescription         = null;
    vm.addItemDueDate             = null;
    vm.addItemComplete            = false;
    //Methods I'm attaching to the controller
    $scope.loadListToEdit         = loadListToEdit;
    vm.updateListCopy             = updateListCopy;
    vm.toggleAddItemFormVisible   = toggleAddItemFormVisible;
    vm.addItemFormHandler         = addItemFormHandler;
    vm.resetNewItemInfo           = resetNewItemInfo;
    vm.toggleEditListFormVisible  = toggleEditListFormVisible;
    vm.editListFormHandler        = editListFormHandler;
    vm.deleteListFormHandler      = deleteListFormHandler;
    vm.updateListAfterPut         = updateListAfterPut;
    
    
    
    function loadListToEdit(){
      $http.get('http://localhost:3000/lists/' + $scope.listIdForEditSection)
      .then(function(result){
        $log.log(result.data);
        vm.result = result.data;
        vm.list   = result.data.items;
        vm.updateListCopy();
      }, function(err){
        $log.log('Err was ', err);
      });
    }
    function updateListCopy(){
      vm.listCopy = angular.copy(vm.list);
    }
    
    
    
    
    
    
    
    //__________________________________________________________________
    //EDIT LIST METHODS
    //__________________________________________________________________
    function toggleEditListFormVisible() {
      if(vm.editListFormVisible){
        vm.editListFormVisible  = false;
        vm.editListButtonText   = 'Edit or delete this list.';
      } else {
        vm.editListFormVisible  = true;
        vm.editListButtonText   = 'Cancel';
      }
    }
    function editListFormHandler() {
      let postObj = {};
      postObj.name = vm.listCopy.name;
      if(vm.listCopy.description) {
        postObj.description = vm.listCopy.description;
      }
      
      $http.put('http://localhost:3000/lists/' + vm.result._id, postObj)
        .then(function(result) {
          vm.editListFormVisible = false;
          vm.updateListAfterPut();
        }, function(err) {
          $log.log('Error editing this list ', err);
        });
    }
    function updateListAfterPut(){
      $log.log(vm.result);
      vm.result.name = vm.listCopy.name;
      if(vm.listCopy.description) {
        vm.result.description = vm.listCopy.description;
      }
      vm.updateListCopy();
    }
    function deleteListFormHandler(){
      if(vm.deleteListButtonText === 'Click again to confirm list deletion.') {
        deleteList();
      } else {
        confirmDeleteList();
      }
    }
    function confirmDeleteList() {
      vm.deleteListButtonText = 'Click again to confirm list deletion.';
    }
    function deleteList () {
      vm.deleteListButtonText = 'Delete this list.';
      $http.delete('http://localhost:3000/lists/' + vm.result._id)
        .then(function(result) {
          vm.editListFormVisible = false;
          vm.addItemFormVisible = false;
          $scope.back();
        }, function(err) {
          $log.log('Error deleting this list ', err);
        });
    }
    
    
    
    //__________________________________________________________________
    //ADD ITEM METHODS
    //__________________________________________________________________
    function toggleAddItemFormVisible() {
      if(vm.addItemFormVisible){
        vm.addItemFormVisible   = false;
        vm.addItemButtonText    = 'Add an item to this list.';
      } else {
        vm.addItemFormVisible   = true;
        vm.addItemButtonText    = 'Cancel';
      }
    }
    function addItemFormHandler() {
      let postObj = {};
      postObj.name = vm.addItemName;
      postObj.lists = [$scope.listIdForEditSection];
      if(vm.addItemDescription) {
        postObj.description = vm.addItemDescription;
      }
      if(vm.addItemDueDate) {
        postObj.dueDate     = vm.addItemDueDate;
      }
      if (vm.addItemComplete) {
        postObj.complete    = vm.addItemComplete;
      }
      $http.post('http://localhost:3000/items', postObj)
        .then(function(result) {
          $log.log(result.data);
          vm.addItemFormVisible = false;
          vm.addItemButtonText = 'Add an item to this list.';
          vm.resetNewItemInfo();
          $scope.loadListToEdit(); //can't be done locally with cacheing, because if they want to edit the item afterwards, we need to have the database id of the item
        }, function(err) {
          $log.log('Error posting this item ', err);
        });
    }
    function resetNewItemInfo(){
      vm.addItemName                = null;
      vm.addItemDescription         = null;
      vm.addItemDueDate             = null;
      vm.addItemComplete            = false;
    }
    
    

    
    
  }
  
})();
