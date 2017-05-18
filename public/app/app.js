
angular.module('userApp', ['appRoutes', 'userController', 'userServices', 'ngAnimate', 'sharedController', 'mainController', 'authServices', 'adminController', 'adminServices', 'studentController', 'studentServices', 'instructorController', 'instructorServices', 'courseServices', 'paperServices'])

    .config(function ($httpProvider) {

        $httpProvider.interceptors.push('AuthInterceptors');

    });