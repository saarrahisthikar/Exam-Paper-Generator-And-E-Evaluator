angular.module('instructorController', ['instructorServices'])

    .controller('instructorController', function (Course, $timeout, $location) {
        var app = this;
        app.errorMsg = false;
        // addCourse
        this.addCourse = function (courseData, valid) {

            // app.successMsg = false;
            app.loading = true;
            console.log('course data is submitted');
            console.log(courseData);
            if (valid) {
                console.log('inside valid');
                Course.create(courseData).then(function (data) {
                    console.log(data);
                    if (data.data.success) {
                        console.log(data.data.success);
                        app.loading = false;
                        app.successMsg = data.data.message;
                        $timeout(function () {
                            courseData = null;
                            $location.path('/');
                        }, 2000);

                    } else {
                        // functionalities when an error occurs
                        app.loading = false;
                        console.log(data.data.success);
                        app.errorMsg = data.data.message;
                    }
                });
            } else {
                app.loading = false;
                app.errormsg = "Please ensure that the form is filled properly";
            }
        };

    });