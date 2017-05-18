angular.module('userServices', [])

    .factory('User', function ($http) {

        userFactory = {};

        // User.create()--user creation
        userFactory.create = function (regData) {
            return $http.post('/api/users', regData);
        }

        //User.createInstructor() -- instructor creation
        userFactory.createInstructor = function (regData) {
            return $http.post('/api/createInstructor', regData);
        }

        //User.checkUsername(regData) -- username checking
        userFactory.checkUsername = function (regData) {
            return $http.post('/api/checkUsername', regData);
        }

        //User.checkEmail(regData) -- email checking
        userFactory.checkEmail = function (regData) {
            return $http.post('/api/checkEmail', regData);
        };

        // User.renewSession(username) -- renew session
        userFactory.renewSession = function (username) {
            return $http.post('/api/renewToken/' + username);
        };

        return userFactory;
    });