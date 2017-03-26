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
        }
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

    });