var assert = require('chai').assert;

var getMarks=require('../testClass/getMarks');

describe('getMarks', function() {
  
    it('Get Marks functionality', function() {
    	assert.equal(getMarks("thirasara"),undefined);
    });
    
});