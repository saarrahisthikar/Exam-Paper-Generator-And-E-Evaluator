var assert = require('chai').assert;

var getStudentDetails=require('../testClass/getStudentDetails');

describe('getStudentDetails', function() {
  
    it('Get Student Details functionality', function() {
    	assert.equal(getStudentDetails(),undefined);
    });
    
});