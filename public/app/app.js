console.log('Testing main app configuration');

angular.module('userApp', ['appRoutes', 'userControllers', 'userServices', 'ngAnimate'])

    .config(function () {
        console.log('Testing the user application')
    });