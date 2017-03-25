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
        return userFactory;
    });