'use strict';
/*global angular */

(function(){
  angular.module('allLists')
    .directive('listSummary', listSummary);
  
  function listSummary(){
    return {
      restrict: 'E',
      templateUrl: 'one-list-summary.html',
      scope: {
        list: '=', 
        toggleTab: '&'
      }
    };
  }
  
})();
