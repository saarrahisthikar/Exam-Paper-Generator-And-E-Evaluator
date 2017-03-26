//console.log('inside auth services');

//console.log('testing user services');

angular.module('authServices', [])

    /*.config(function(){
        console.log('auth services');
    });*/
    .factory('Auth', function ($http, AuthToken) {

        var authFactory = {};
        //login to the system
        authFactory.login = function (loginData) {
            return $http.post('/api/authenticate', loginData).then(function (data) {
                console.log(data.data.token);
                AuthToken.setToken(data.data.token);
                return data;
            });
        };
        //checking whether the user is logged in
        authFactory.isLoggedIn = function () {
            //console.log(AuthToken.getToken);
            if (AuthToken.getToken()) {
                return true;
            } else {
                return false;
            }
        };
        //logging out
        authFactory.logout = function () {
            AuthToken.setToken();
        };

        authFactory.getUser = function () {
            if (AuthToken.getToken()) {
                return $http.post('/api/me');
            } else {
                $q.reject({ message: 'user has no token' });
            }
        };
        return authFactory;

    })

    .factory('AuthToken', function ($window) {

        var authTokenFactory = {};
        //AuthToken.setToken(token)
        authTokenFactory.setToken = function (token) {
            if (token) {
                $window.localStorage.setItem('token', token);
            }
            else {
                $window.localStorage.removeItem('token');
            }
        };

        authTokenFactory.getToken = function () {
            return $window.localStorage.getItem('token');
        };

        return authTokenFactory;

    })

    .factory('AuthInterceptors', function (AuthToken) {
        var authInterceptorsFactory = {};

        authInterceptorsFactory.request = function (config) {
            var token = AuthToken.getToken();
            if (token) config.headers['x-access-token'] = token;
            return config;
        };

        return authInterceptorsFactory;
    });