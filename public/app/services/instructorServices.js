angular.module('instructorServices', [])

    .factory('Course', function ($http) {
        courseFactory = {};
        // creating instructor
        courseFactory.create = function (courseData) {
            return $http.post('/api/createCourse', courseData);
        };

        return courseFactory;

    });