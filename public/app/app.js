//console.log('Testing main app configuration');

angular.module('userApp', ['appRoutes', 'userController', 'userServices', 'ngAnimate', 'mainController', 'authServices', 'adminController', 'adminServices', 'studentController', 'studentServices', 'instructorController', 'instructorServices','courseServices','paperServices'])

    .config(function ($httpProvider) {
                  //console.log('Testing the user application')
   $httpProvider.interceptors.push('AuthInterceptors');
});