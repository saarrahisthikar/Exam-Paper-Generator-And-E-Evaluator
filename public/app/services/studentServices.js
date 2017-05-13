angular.module('studentServices', [])

    .factory('StudentCourse', function ($http) {
        studentCourseFactory = {};
        // student enrolling
        studentCourseFactory.enroll = function (moduleCode, username) {
            return $http.post('/api/enroll', [moduleCode, username]);
        };

        studentCourseFactory.isEnrolled = function (moduleCode, username) {
            return $http.get('api/isEnrolled/' + moduleCode + '/' + username);
        };
        studentCourseFactory.getCourses=function(username){
            return $http.get('api/enrolledCourses/'+username);
        };

        return studentCourseFactory;
    });