angular.module('courseServices', [])


.factory('CourseDetails', function ($http) {
        courseDetailFactory = {};
        // creating instructor
        courseDetailFactory.getCourseDetails = function () {
            return $http.get('/api/courseDetails');
        };

        return courseDetailFactory;

    });
  