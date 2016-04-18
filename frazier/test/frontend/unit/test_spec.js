'use strict';
/*global angular it describe expect */


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
    var $scope          =  $rootScope.$new();
    MainController      = $controller('MainController', {$scope: $scope});
    $scope              =  $rootScope.$new();
    $scope.ctrl = MainController;
    AllListsController  = $controller('AllListsController', {$scope: $rootScope.$new()});
    $scope              =  $rootScope.$new();
    $scope.ctrl = MainController;
    
    // EditListController  = $controller('EditListController', {$scope: $rootScope.$new()});
  }));
  beforeEach(angular.mock.inject(function(_$httpBackend_){
    $httpBackend = _$httpBackend_;
  }));
  afterEach(function(){
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });
  
  

  // describe('Unit tests', () => {
  //   
  // });
  
  
  describe('REST tests', () => {
    it('should try to load all lists', () => {
      $httpBackend.expectGET('http://localhost:3000/lists')
        .respond(200, [{name: 'TEST', _id: 1234}]);
      MainController.initialize();
      $httpBackend.flush();
      expect(MainController.test).toEqual('blah blah blah');
      expect(MainController.listIdForEditSection).toEqual(null);
      expect(MainController.sectionName).toEqual('allLists');
      expect(MainController.lists[0].name).toEqual('TEST');
      
    });
    
    it('should be able to post a list', () => {
      expect(MainController.listIdForEditSection).toEqual(null);
      $httpBackend.expectPOST('http://localhost:3000/lists', {name: 'HELLO', description: 'WORLD'})
        .respond(200, {name: 'HELLO', description: 'WORLD', _id: 1234});
      AllListsController.addListName = 'HELLO';
      AllListsController.addListDescription = 'WORLD';
      AllListsController.addListFormHandler();
      $httpBackend.flush();
      expect(AllListsController.postError).toEqual(null);
      expect(MainController.listIdForEditSection).toEqual('1234');
    });
    
    // it('should try to load all people', () => {
    //   $httpBackend.expectGET('http://localhost:3000/lists')
    //     .respond(200, [{name: 'TEST', _id: 1234}]);
    //   MainController.initialize();
    //   $httpBackend.flush();
    //   expect(MainController.test).toEqual('blah blah blah');
    //   expect(MainController.sectionName).toEqual('allLists');
    //   expect(MainController.lists[0].name).toEqual('TEST');
    // });
    
  });

});
