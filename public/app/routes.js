
var app = angular.module('appRoutes', ['ngRoute'])

app.config(function ($routeProvider, $locationProvider) {

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

        // can be accessed by anyone
        .when('/viewCourses', {
            templateUrl: 'app/views/pages/shared/viewCourses.html',
            authenticated: false,
            controller: 'sharedController',
            controllerAs: 'shared'
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
            controller: 'adminController',
            controllerAs: 'admin',
            authenticated: true,
            permission: 'admin'
        })
        
        // accessing the viewStudents page
        .when('/viewStudents', {
            templateUrl: 'app/views/pages/admin/viewStudents.html',
            controller: 'adminController',
            controllerAs: 'admin',
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
            controller: 'instructorController',
            controllerAs: 'instructor',
            permission: 'instructor'
        })

        // show all the papers
        .when('/showPapers', {
            templateUrl: 'app/views/pages/instructor/showPaper.html',
            authenticated: true,
            controller: 'instructorController',
            controllerAs: 'instructor',
            permission: 'instructor'
        })

        // show all the papers
        .when('/showCoursePapers/:courseID', {
            templateUrl: 'app/views/pages/instructor/showCoursePapers.html',
            authenticated: true,
            controller: 'instructorController',
            controllerAs: 'instructor',
            permission: 'instructor'
        })

        // show the generated papers
        .when('/showGeneratedPaper', {
            templateUrl: 'app/views/pages/instructor/showGeneratedPaper.html',
            authenticated: true,
            controller: 'instructorController',
            controllerAs: 'instructor',
            permission: 'instructor'
        })

        //show selected paper
        .when('/viewPaper/:questionType/:paperNo', {
            templateUrl: 'app/views/pages/instructor/viewPaper.html',
            authenticated: true,
            controller: 'instructorController',
            controllerAs: 'instructor',
            permission: 'instructor'
        })

        .when('/viewCoursesInstructor', {
            templateUrl: 'app/views/pages/instructor/viewCoursesInstructor.html',
            authenticated: true,
            controller: 'instructorController',
            controllerAs: 'instructor',
            permission: 'instructor'
        })

        //student

        //show question type and papers
        .when('/stuShowCoursePapers/:courseID', {
            templateUrl: 'app/views/pages/student/paperView/stuShowCoursePapers.html',
            authenticated: true,
            controller: 'studentController',
            controllerAs: 'student',
            permission: 'student'
        })

        // student view courses
        .when('/stuViewCourses/:username', {
            templateUrl: 'app/views/pages/student/viewCourses.html',
            authenticated: true,
            controller: 'studentController',
            controllerAs: 'student',
            permission: 'student'
        })

        //try selected paper
        .when('/viewTryPaper/:questionType/:paperNo', {
            templateUrl: 'app/views/pages/student/paperView/stuViewTryPaper.html',
            authenticated: true,
            controller: 'studentController',
            controllerAs: 'student',
            permission: 'student'
        })

        //view marks
        .when('/viewMarks/:marks', {
            templateUrl: 'app/views/pages/student/viewMarks.html',
            authenticated: true,
            controller: 'studentController',
            controllerAs: 'student',
            permission: 'student'
        })

        // view progress
        .when('/viewProgress', {
            templateUrl: 'app/views/pages/student/viewProgress.html',
            authenticated: true,
            controller: 'studentController',
            controllerAs: 'student',
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