
angular.module('sharedController', ['courseServices', 'userServices'])

    .controller('sharedController', function (CourseDetails) {

        var app = this;

        // get course details
        app.getAllCourses = function () {

            app.courseDetails = [];

            //   get course details  
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

    });