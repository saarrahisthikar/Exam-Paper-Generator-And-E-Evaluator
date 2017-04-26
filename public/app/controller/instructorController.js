angular.module('instructorController', ['instructorServices', 'authServices', 'courseServices'])

    .controller('instructorController', function (Course, $timeout, $location, Question, Auth, CourseDetails, Paper) {
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


        app.generatePaper = function (paperData, valid) {

            app.loading = true;
            console.log('paper data is submitted');
            console.log(paperData);


            if (valid) {
                console.log('inside valid');
                Paper.generate(paperData).then(function (data) {
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

        app.courseDetails = [];
        CourseDetails.getCourseDetails().then(function (data) {
            console.log("inside get Course");
            var i = 0;
            while (data.data.courseDetails[i]) {
                console.log(data.data.courseDetails[i]);
                app.courseDetails.push(data.data.courseDetails[i]);
                i = i + 1;
            }
        });
    });