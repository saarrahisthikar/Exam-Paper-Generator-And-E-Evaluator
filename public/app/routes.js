console.log('Testing route configuration');

var app = angular.module('appRoutes', ['ngRoute'])

app.config(function ($routeProvider, $locationProvider) {
    console.log('This is from routes')

    $routeProvider

        .when('/', {
            templateUrl: 'app/views/pages/home.html'
        })

        .when('/about', {
            templateUrl: 'app/views/pages/about.html'
        })

        .when('/register', {
            templateUrl: 'app/views/pages/users/register.html'
        })

        .otherwise({ redirectTo: 'app/views/pages/home.html' });

    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });

});

