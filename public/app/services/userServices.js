//console.log('testing user services');

angular.module('userServices', [])

    /*.config(function(){
        console.log('user services');
    });*/
    .factory('User', function ($http) {

        userFactory = {};
        // User.create()
        userFactory.create = function (regData) {
            return $http.post('/api/users', regData);
        }

        //User.createInstructor()
        userFactory.createInstructor = function (regData) {
            return $http.post('/api/createInstructor', regData);
        }

        //User.checkUsername(regData);
        userFactory.checkUsername = function (regData) {
            return $http.post('/api/checkUsername', regData);
        }

        //User.checkEmail(regData);
        userFactory.checkEmail = function (regData) {
            return $http.post('/api/checkEmail', regData);
        };

        // User.renewSession(username)
        userFactory.renewSession = function (username) {
            return $http.post('/api/renewToken/' + username);
        };

        return userFactory;
    });