'use strict';
/*global angular */



(function(){
  angular.module('app', ['oneItem', 'oneList', 'allLists'])
    .controller('MainController', ['$http', '$scope', MainController]);

  function MainController($http, $scope) { 
    const vm                    = this;
    vm.test                     = 'blah blah blah';
    vm.listIdForEditSection     = null;
    vm.lists                    = [{name: 'lists text'}];
    
    vm.sections = { 
      allLists: {name: 'AllListsController', source: './all-lists.html'}, 
      editList: {name: 'EditListController', source: './edit-one-list.html'} 
    };
    vm.sectionName              = 'allLists';
    vm.section                  = vm.sections[vm.sectionName].source;
    
    vm.updateSection            = updateSection;
    vm.initialize               = initialize;
    vm.toggleTab                = toggleTab;
    vm.back                     = back;
    
    function toggleTab(listId){
      if(vm.sectionName === 'allLists' && listId){
        vm.listIdForEditSection = listId;
        vm.updateSection('editList');
      } else {
        vm.updateSection('allLists');
      }
    }
    
    function updateSection(sectionName){
      vm.sectionName  = sectionName;
      vm.section      = vm.sections[vm.sectionName].source;
    }
    
    function initialize(cb){
      $http.get('http://localhost:3000/lists')
        .then((result) => {
          vm.lists = result.data;
          if(cb){
            cb(null, result.data);
          }
        }, function(err){
          vm.test = err;
          if(cb){
            cb(err);
          }
        });
    }
    
    function back(){
      vm.initialize(vm.toggleTab()); 
    }
    
  }
  
  
})();
