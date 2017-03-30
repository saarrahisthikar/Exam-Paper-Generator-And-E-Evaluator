angular.module('instructorController', ['instructorServices'])

    .controller('instructorController', function (Course, $timeout, $location) {
        var app = this;

        // addCourse
        this.addCourse = function (courseData, valid) {
            app.errorMsg = false;
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
                            $location.path('/');
                        }, 2000);

                    } else {
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