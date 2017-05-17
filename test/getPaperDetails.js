var assert = require('chai').assert;

var getPaperDetails=require('../testClass/getPaperDetails');

describe('getPaperDetails', function() {
  
    it('Get Paper Details functionality', function() {
    	assert.equal(getPaperDetails("mcq", "CS3021"),undefined);
    });
    
});