angular.module('courseServices', [])


.factory('CourseDetails', function ($http) {
        courseDetailFactory = {};
        // creating instructor
        courseDetailFactory.getCourseDetails = function (username) {
            return $http.get('/api/courseDetails/'+username);
        };

         courseDetailFactory.getAllCourses = function () {
            return $http.get('/api/courseDetails');
        };

        return courseDetailFactory;

    });
  