angular.module('adminServices', [])

    .factory('StudentDetails', function ($http) {
        studentDetailsFactory = {};
        // student enrolling
        studentDetailsFactory.getStudentDetails = function () {
            return $http.get('/api/studentInfo');
        };

        return studentDetailsFactory;
    })

    .factory('InstructorDetails', function ($http) {
        instructorDetailsFactory = {};
        // get instructor details
        instructorDetailsFactory.getInstructorDetails = function () {
            return $http.get('/api/instructorInfo');
        };

        return instructorDetailsFactory;
    });