//console.log('testing user services');

angular.module('userServices', [])

    /*.config(function(){
        console.log('user services');
    });*/
    .factory('User', function ($http) {

        userFactory = {};

        userFactory.create = function (loginData) {
            return $http.post('/api/users', loginData);
        }
        return userFactory;
    });