angular.module('studentController', ['studentServices', 'authServices', 'courseServices'])
    // console.log('inside student controller');

    .controller('studentController', function ($q, $scope, Auth, CourseDetails, StudentCourse, $timeout, $location) {

        var app = this;
        app.errorMsg = false;
        app.loading = false;
        app.successMsg = false;

        // app.getEnrolledCourses = function (username) {

        //     StudentCourse.getCourses(username).then(function (data) {
        //         var enCourses = [];
        //         console.log("inside get Course");
        //         var i = 0;
        //         while (data.data.courses.courses[i]) {
        //             console.log(data.data.courses.courses[i]);
        //             enCourses.push(data.data.courses.courses[i]);
        //             i = i + 1;
        //         }
        //         console.log("inside " + enCourses);
        //         // $scope.enCourses = enCourses;   
        //         return enCourses;
        //     });

        // }


        app.getEnrolledCourses = function () {
            app.enrollDetails = [];
            Auth.getUser().then(function (data) {
                console.log("front end username "+ data.data.username);
                StudentCourse.getCourses(data.data.username).then(function (data) {
                    console.log("inside get Course ");
                    console.log("course :"+data.data.courses.courses[0]);
                    var i = 0;
                    while (data.data.courses.courses[i]) {
                        console.log(data.data.courses.courses[i]);
                        app.enrollDetails.push(data.data.courses.courses[i]);
                        i = i + 1;
                    }
                });

            });

            return app.enrollDetails;

        }



        app.enroll = function (moduleCode, username) {

            console.log('inside enroll ' + moduleCode + " " + username);
            app.loading = true;

            StudentCourse.enroll(moduleCode, username).then(function (data) {
                if (data.data.success) {
                    console.log(data.data.success);
                    app.loading = false;
                    app.successMsg = data.data.message;
                    $timeout(function () {
                        $location.path('/viewCourses');
                    }, 2000);
                } else {
                    // functionalities when an error occurs
                    app.loading = false;
                    console.log(data.data.success);
                    app.errorMsg = data.data.message;
                }
            });
        };
        // checking whether the student is enrolled

        app.enrolled = false;
        app.checkStudentEnrolment = function (moduleCode, username) {

            StudentCourse.isEnrolled(moduleCode, username).then(function (data) {
                if (data.data.success) {

                    app.successMsg = data.data.message;
                    console.log("output " + true);
                    app.enrolled = true;
                } else {
                    // functionalities when an error occurs

                    app.errorMsg = data.data.message;
                    console.log("output " + false);
                    app.enrolled = false;
                }
            });


        }



        app.isEnrolled = function (moduleCode, username) {

            return true;
            // app.checkStudentEnrolment(moduleCode, username);

        }

    });