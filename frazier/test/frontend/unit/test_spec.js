'use strict';
/*global expect it */


require(__dirname + '/../../../build/bundle.js');
// const angular = require('angular');
require('angular-mocks');





describe('it should be able to test something', () => {
  
  it('should have a test', () => {
    expect(false).toBe(false);
  });

});

describe('Controller testing', () => {
  var MainController, 
    EditListController, 
    AllListsController, 
    $httpBackend;
  beforeEach(angular.mock.module('app'));
  beforeEach(angular.mock.inject(function($controller, $rootScope) {
    var $scope = $rootScope.$new();
    MainController      = $controller('MainController', {$scope: $scope});
    EditListController  = $controller('EditListController', {$scope: $scope});
    AllListsController  = $controller('AllListsController', {$scope: $scope});
  }));
  beforeEach(angular.mock.inject(function(_$httpBackend_){
    $httpBackend = _$httpBackend_;
  }));
  afterEach(function(){
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });
  
  
  describe('REST tests', () => {
    it('should try to load all people', () => {
      $httpBackend.expectGET('http://localhost:3000/lists')
      .respond(200, [{name: 'TEST', _id: 1234}]);
      MainController.initialize();
      $httpBackend.flush();
      expect(MainController.test).toEqual('blah blah blah');
      expect(MainController.sectionName).toEqual('allLists');
      expect(MainController.lists[0].name).toEqual('TEST');
    });
    

  });

});
