'use strict';
/*global browser expect element by */  //configure eslint so it doesn't complain about browser variable


describe('e2e testing: ', function(){
  console.log('got here');
  
  beforeEach(function(){
    console.log('beforeeach');
    browser.get('http://127.0.0.1:8080/');
  });
  
  
  describe('list summary page: ', function() {
    var addListButton = element(by.binding('listsCtrl.addButtonText'));  
    var saveListButton, addListFormName, addListFormDesc;
    
    it('should should have the correct page title', function() {
      expect(browser.getTitle()).toEqual('Todo Lists');
    });
    
    describe('adding a new list: ', function() {
        
      it('should have the correct initial button text', function() {
        expect(addListButton.getText()).toEqual('Make a new list');
      });
      
         
      it('should be possible to enter info in the form', function() {
        addListButton.click();
        // element(by.binding('listsCtrl.addButtonText')).click();
        expect(addListButton.getText()).toEqual('Cancel');
        saveListButton = element(by.buttonText('Save'));
        addListFormName = element(by.model('listsCtrl.addListName'));
        addListFormDesc = element(by.model('listsCtrl.addListDescription')); 
        addListFormName.clear();
        addListFormDesc.clear();
        addListFormName.sendKeys('My to-do list');
        addListFormDesc.sendKeys('A todo list I built for a test');
        saveListButton.click();
        //TODO: finish filling out this test
        // expect()
      });

    });
    
  });
  
  // describe('edit list page', function() {
  //   it('should have changed to the list form', function() {
  //     element(by.binding('listsCtrl.addButtonText')).click();
  //     element(by.model('listsCtrl.addListName')).sendKeys('My to-do list');
  //     element(by.model('listsCtrl.addListDescription')).sendKeys('A todo list I built for a test');
  //     element(by.buttonText('Save')).click();
  //     expect(element(by.binding('editCtrl.result.name')).getText()).toEqual('My to-do list');
  //     expect(element(by.binding('editCtrl.result.description')).getText()).toEqual('My to-do list');
  //   });
    
  // });
  
  
});
