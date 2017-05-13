




var assert = require('chai').assert;
var addUser = require('../addUser');

describe('addUser', function () {
    it('should return true', function () {
        var result = addUser({username:'malmi', password: 'Malmi@123',userType :'student',name:'Malmi Lithmi',email:'malmi@gmail.com'});
        assert.equal(result,true);
     })
})