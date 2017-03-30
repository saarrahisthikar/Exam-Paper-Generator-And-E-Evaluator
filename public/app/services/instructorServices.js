angular.module('instructorServices', [])

    .factory('Course', function ($http) {
        courseFactory = {};

        courseFactory.create = function (courseData) {
            return $http.post('/api/createCourse', courseData);
        };

        return courseFactory;

    });