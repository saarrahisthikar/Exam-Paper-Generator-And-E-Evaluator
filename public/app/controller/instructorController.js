angular.module('instructorController', ['instructorServices', 'authServices', 'courseServices', 'paperServices'])

    .controller('instructorController', function (Course, $timeout, $location, Question, Auth, CourseDetails, Paper, $routeParams, PaperDetails) {
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


        app.getRouterParams = function () {
            return $routeParams.courseID;
        };


        app.generatePaper = function (paperData, valid) {

            app.loading = true;
            console.log('paper data is submitted');
            console.log(paperData);
            app.paperMCQ = false;
            app.paperStructured = false;

            if (paperData.paperType == 'mcq') {
                app.paperMCQ = true;
            } else if (paperData.paperType == 'structured') {
                app.paperStructured = true;
            }

            if (valid) {
                console.log('inside valid');
                Paper.generate(paperData).then(function (data) {
                    console.log(data + "inside mcq");
                    if (data.data.success) {
                        console.log(data.data.success);
                        app.loading = false;
                        app.successMsg = data.data.message;

                        $timeout(function () {
                            app.paper = data.data.paper.question;
                            //   app.paper.question=app.shuffle(app.paper.question);
                            paperData = null;
                            $location.path('/showGeneratedPaper');
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

        app.shuffle = function (array) {

            for (var i = array.length - 1; i > 0; i--) {
                var j = Math.floor(Math.random() * (i + 1));
                var temp = array[i];
                array[i] = array[j];
                array[j] = temp;
            }
            return array;

        };

        app.getPaperDetails = function (paperInfo) {
            app.paperDetails = [];
            console.log(paperInfo.questionType);
            PaperDetails.getPaperDetails(paperInfo).then(function (data) {
                console.log("inside paper details");
                var i = 0;
                while (data.data.paperDetails[i]) {
                    console.log(data.data.paperDetails[i]);
                    app.paperDetails.push(data.data.paperDetails[i]);
                    i = i + 1;
                }

            });
            return app.paperDetails;
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