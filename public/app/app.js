//console.log('Testing main app configuration');

angular.module('userApp', ['appRoutes', 'userControllers', 'userServices', 'ngAnimate', 'mainController', 'authServices'])

   /* .config(function ($httpProvider) {
                  //console.log('Testing the user application')
  //  $httpProvider.interceptors.push('AuthInterceptors');
})*/
;