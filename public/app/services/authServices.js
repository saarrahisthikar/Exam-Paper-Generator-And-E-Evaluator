//console.log('inside auth services');

//console.log('testing user services');

angular.module('authServices', [])

    /*.config(function(){
        console.log('auth services');
    });*/
    .factory('Auth', function ($http) {

        var authFactory = {};

        authFactory.login = function (loginData) {
            return $http.post('/api/authenticate', loginData).then(function (data) {
                //console.log(data.data.token);
                AuthToken.setToken(data.data.token);
                return data;
            });
        };

        authFactory.isLoggedIn = function () {
            if (AuthToken.getToken) {
                return true;
            } else {
                return false;
            }
        };
        return authFactory;
    })

    .factory('AuthToken', function () {

        var authTokenFactory = {};
        //AuthToken.setToken(token)
        authTokenFactory.setToken = function (token) {
            $window.localStorage.setItem('token', token);
        };

        authTokenFactory.getToken = function () {
            return $window.localStorage.getItem('token');
        };
        return authTokenFactory;

    });