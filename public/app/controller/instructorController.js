angular.module('instructorController', ['instructorServices', 'authServices'])

    .controller('instructorController', function (Course, $timeout, $location, Question, Auth) {
        var app = this;
        app.errorMsg = false;
        // addCourse
        app.addCourse = function (courseData, valid) {

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

        app.addQuestion = function (questionData, valid) {

            // app.successMsg = false;
            app.loading = true;
            console.log('question data is submitted');
            console.log(questionData);
            if (valid) {
                console.log('inside valid');
                //adding mcq question 

          
                    if (questionData.questionType == 'mcq') {

                         Question.addMCQ(questionData).then(function (data) {
                            console.log(data + "inside mcq");
                            if (data.data.success) {
                                console.log(data.data.success);
                                app.loading = false;
                                app.successMsg = data.data.message;
                                $timeout(function () {
                                    questionData = null;
                                    $location.path('/');
                                }, 2000);

                            } else {
                                // functionalities when an error occurs
                                app.loading = false;
                                console.log(data.data.success);
                                app.errorMsg = data.data.message;
                            }
                        });
                        //adding structured question 
                    } else if (questionData.questionType == 'structured') {
                        Question.addStructured(questionData).then(function (data) {
                            console.log(data);
                            if (data.data.success) {
                                console.log(data.data.success);
                                app.loading = false;
                                app.successMsg = data.data.message;
                                $timeout(function () {
                                    questionData = null;
                                    $location.path('/');
                                }, 2000);

                            } else {
                                // functionalities when an error occurs
                                app.loading = false;
                                console.log(data.data.success);
                                app.errorMsg = data.data.message;
                            }
                        });
                    }
             
            } else {
                app.loading = false;
                app.errormsg = "Please ensure that the form is filled properly";
                console.log('invalid');
            }
        };
    });