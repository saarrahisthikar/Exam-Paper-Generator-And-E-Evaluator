
angular.module('sharedController', ['courseServices', 'userServices'])

    .controller('sharedController', function ( CourseDetails) {

        var app = this;
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
    });