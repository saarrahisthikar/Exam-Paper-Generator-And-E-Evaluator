//console.log('testing user services');

angular.module('userServices', [])

    /*.config(function(){
        console.log('user services');
    });*/
    .factory('User', function ($http) {

        userFactory = {};

        userFactory.create = function (regData) {
            return $http.post('/api/users', regData);
        }

        //User.checkUsername(regData);
        userFactory.checkUsername = function (regData) {
            return $http.post('/api/checkUsername', regData);
        }

        //User.checkEmail(regData);
        userFactory.checkEmail = function (regData) {
            return $http.post('/api/checkEmail', regData);
        }
        return userFactory;
    });