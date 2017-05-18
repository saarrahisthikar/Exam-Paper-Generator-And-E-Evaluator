angular.module('adminController', ['adminServices'])
    // console.log('inside admin controller');
    .controller('adminController', function ($routeParams, StudentDetails, InstructorDetails, $timeout, $location) {

        var app = this;
        app.errorMsg = false;
        app.loading = false;
        app.successMsg = false;

        //get student details
        app.getStudentDetails = function () {

            app.students = [];

            // get student details 
            StudentDetails.getStudentDetails().then(function (data) {

                var i = 0;
                while (data.data.student[i]) {
                    console.log(data.data.student[i]);
                    app.students.push(data.data.student[i]);
                    i = i + 1;
                }

            });

            return app.students;
        }

        //get instructor details
        app.getInstructorDetails = function () {

            app.instructors = [];

            // get instructor information
            InstructorDetails.getInstructorDetails().then(function (data) {

                console.log("instructor : " + JSON.stringify(data.data));
                var i = 0;
                while (data.data.instructor[i]) {
                    console.log(data.data.instructor[i]);
                    app.instructors.push(data.data.instructor[i]);
                    i = i + 1;
                }

            });

            return app.instructors;
        }

    });