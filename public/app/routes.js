//console.log('Testing route configuration');

var app = angular.module('appRoutes', ['ngRoute'])

app.config(function ($routeProvider, $locationProvider) {
    //console.log('This is from routes')

    $routeProvider

        // accessing the home page
        .when('/', {
            templateUrl: 'app/views/pages/home.html'
        })

        // accessing the about page
        .when('/about', {
            templateUrl: 'app/views/pages/about.html'
        })

        // accessing the register page
        .when('/register', {
            templateUrl: 'app/views/pages/users/register.html',
            controller: 'registerController',
            controllerAs: 'register',
            authenticated: false
        })

        // accessing the login page
        .when('/login', {
            templateUrl: 'app/views/pages/users/login.html',
            authenticated: false
        })

        // accessing the logout page
        .when('/logout', {
            templateUrl: 'app/views/pages/users/logout.html',
            authenticated: true
        })

        // accessing the profile page
        .when('/profile', {
            templateUrl: 'app/views/pages/users/profile.html',
            authenticated: true
        })

        // admin

        // accessing the addInstructors page
        .when('/addInstructor', {
            templateUrl: 'app/views/pages/admin/addInstructors.html',
            controller: 'registerController',
            controllerAs: 'register',
            authenticated: true,
            permission: 'admin'
        })


        // accessing the viewInstructors page
        .when('/viewInstructors', {
            templateUrl: 'app/views/pages/admin/viewInstructors.html',
            authenticated: true,
            permission: 'admin'
        })
        // accessing the viewStudents page
        .when('/viewStudents', {
            templateUrl: 'app/views/pages/admin/viewStudents.html',
            authenticated: true,
            permission: 'admin'
        })

        // instructor

        // accessing the addCourses page
        .when('/addCourses', {
            templateUrl: 'app/views/pages/instructor/addCourses.html',
            authenticated: true,
            controller: 'instructorController',
            controllerAs: 'instructor',
            permission: 'instructor'
        })

        // accessing the addQuestion page
        .when('/addQuestion', {
            templateUrl: 'app/views/pages/instructor/addQuestion.html',
            authenticated: true,
            controller: 'instructorController',
            controllerAs: 'instructor',
            permission: 'instructor'
        })

        // accessing the createPaper page
        .when('/createPaper', {
            templateUrl: 'app/views/pages/instructor/createPaper.html',
            authenticated: true,
            permission: 'instructor'
        })

        //student
        // accessing the viewCourses page
        .when('/viewCourses', {
            templateUrl: 'app/views/pages/student/viewCourses.html',
            authenticated: true,
            permission: 'student'
        })

        .otherwise({ redirectTo: 'app/views/pages/home.html' });

    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });

});


// checking whether the user can access each route -condition: ability to access with routes
app.run(['$rootScope', 'Auth', '$location', function ($rootScope, Auth, $location) {

    $rootScope.$on('$routeChangeStart', function (event, next, current) {
        app.isAdmin = false;
        app.isInstructor = false;
        app.isStudent = false;
        if (next.$$route.authenticated) {
            if (next.$$route.authenticated == true) {
                if (!Auth.isLoggedIn()) {
                    event.preventDefault();
                    $location.path('/');
                } else if (next.$$route.permission) {
                    Auth.getUser().then(function (data) {
                        app.userType = data.data.userType;
                    });

                    if (next.$$route.permission != app.userType) {
                        event.preventDefault();
                        $location.path('/');
                    }
                }

            }
            else if (next.$$route.authenticated == false) {
                if (Auth.isLoggedIn()) {
                    event.preventDefault();
                    $location.path('/profile');
                }
            }
        }
    });
}]);