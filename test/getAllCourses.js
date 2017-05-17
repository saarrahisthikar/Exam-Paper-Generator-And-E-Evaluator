var assert = require('chai').assert;

var getAllCourses=require('../testClass/getAllCourses');

describe('getAllCourses', function() {
  
    it('Get all courses functionality', function() {
    	assert.equal(getAllCourses("thirasara"),undefined);
    });
    
});