
angular.module('sharedController', ['courseServices', 'userServices'])

    .controller('sharedController', function (CourseDetails) {

        var app = this;

        app.getAllCourses = function () {
            app.courseDetails = [];
            CourseDetails.getAllCourses().then(function (data) {
                console.log("inside get Course");
                var i = 0;
                while (data.data.courseDetails[i]) {
                    console.log(data.data.courseDetails[i]);
                    app.courseDetails.push(data.data.courseDetails[i]);
                    i = i + 1;
                }
            });
            return app.courseDetails;
        }

        //temp
        app.getEnrolledCourses1 = function (username) {
            app.enCourses = [];
            StudentCourse.getCourses(username).then(function (data) {

                console.log("inside get Course");
                var i = 0;
                while (data.data.courses.courses[i]) {
                    console.log(data.data.courses.courses[i]);
                    app.enCourses.push(data.data.courses.courses[i]);
                    i = i + 1;
                }
                console.log("inside " + enCourses);
                // $scope.enCourses = enCourses;   

            });
            return app.enCourses;
        }
    });