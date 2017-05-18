angular.module('studentServices', [])

    .factory('StudentCourse', function ($http) {

        studentCourseFactory = {};

        // student enrolling
        studentCourseFactory.enroll = function (moduleCode, username) {
            return $http.post('/api/enroll', [moduleCode, username]);
        };

        // get courses
        studentCourseFactory.getCourses = function (username) {
            return $http.get('api/enrolledCourses/' + username);
        };

        return studentCourseFactory;
    })


    .factory('StudentMarks', function ($http) {

        studentMarksFactory = {};

        // student enrolling
        studentMarksFactory.getProgress = function (username) {
            return $http.get('/api/progress/' + username);
        };

        return studentMarksFactory;
    });