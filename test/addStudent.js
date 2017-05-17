var assert = require('chai').assert;

var addStudent=require('../testClass/addStudent');

describe('AddStudent', function() {
  
    it('Add Student functionality', function() {
    	assert.equal(addStudent("thirasara ariyarathna", "thirasara", "Thirasara@123", "thirasaradevanmini@gmail.com"),undefined);
    });

    
  
});