angular.module('instructorController', ['instructorServices', 'authServices', 'courseServices', 'paperServices'])

    .controller('instructorController', function (Course, $timeout, $location, Question, Auth, CourseDetails, Paper, $routeParams, PaperDetails) {
        var app = this;
        app.errorMsg = false;
        // addCourse
        app.addCourse = function (courseData, valid) {

            app.errorMsg = false;
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
                            app.successMsg = false;
                            app.courseData = null;
                            $location.path('/');
                        }, 2000);

                    } else {
                        // functionalities when an error occurs
                        console.log(data.data.success);
                        app.errorMsg = data.data.message;
                    }
                });
            } else {
                app.errorMsg = "Please ensure that the form is filled properly";
            }
        };


        app.getRouterParams = function () {
            return $routeParams.courseID;
        };


        app.generatePaper = function (paperData, valid) {


            console.log('paper data is submitted');
            console.log(paperData);
            app.paperMCQ = false;
            app.paperStructured = false;
            app.errorMsg = false;

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
                        app.successMsg = data.data.message;

                        $timeout(function () {
                            app.paper = data.data.paper.question;
                            //   app.paper.question=app.shuffle(app.paper.question);
                            paperData = null;
                            app.successMsg = false;
                            $location.path('/showGeneratedPaper');
                        }, 2000);

                    } else {
                        // functionalities when an error occurs
                        console.log(data.data.success);
                        app.errorMsg = data.data.message;
                    }
                });
                //adding structured question 
            }

        };

        app.addQuestion = function (questionData, valid) {
            // app.successMsg = false;
            app.courseErrorMsg = false;
            console.log('question data is submitted ' + JSON.stringify(questionData.correctAns));
            console.log(questionData);
            if (valid) {
                console.log('inside valid');
                //adding mcq question 


                if ((questionData.questionType) == 'mcq' && !(questionData.correctAns == undefined || questionData.wrongAns1 == undefined || questionData.wrongAns2 == undefined || questionData.wrongAns3 == undefined || questionData.wrongAns4 == undefined)) {

                    Question.addMCQ(questionData).then(function (data) {
                        console.log(data + "inside mcq");
                        if (data.data.success) {
                            console.log(data.data.success);
                            app.loading = false;
                            app.successMsg = data.data.message;
                            $timeout(function () {
                                app.successMsg = false;
                                questionData = null;
                                $location.path('/');
                            }, 2000);

                        } else {
                            // functionalities when an error occurs
                            app.loading = false;
                            console.log(data.data.success);
                            app.courseErrorMsg = data.data.message;
                        }
                    });
                    //adding structured question 
                } else if ((questionData.questionType == 'structured') && !(questionData.keyWord1 == undefined || questionData.keyWord2 == undefined || questionData.keyWord3 == undefined || questionData.keyWord4 == undefined)) {
                    Question.addStructured(questionData).then(function (data) {
                        console.log(data);
                        if (data.data.success) {
                            console.log(data.data.success);
                            app.loading = false;
                            app.successMsg = data.data.message;
                            $timeout(function () {
                                app.successMsg = false;
                                questionData = null;
                                $location.path('/');
                            }, 2000);

                        } else {
                            // functionalities when an error occurs
                            app.loading = false;
                            console.log(data.data.success);
                            app.courseErrorMsg = data.data.message;
                        }
                    });
                } else {
                    app.courseErrorMsg = "Feilds cannot be empty";
                    console.log("Feilds cannot be empty");
                }

            } else {
                console.log("UNdefined ............");
                app.courseErrorMsg = "Please ensure that the form is filled properly";
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


        app.questionPaper = []
        app.getRouterParamsPaper = function () {
            console.log($routeParams.questionType);
            console.log($routeParams.paperNo);
            app.questionPaper.push($routeParams.questionType);
            app.questionPaper.push($routeParams.paperNo);
            console.log(app.questionPaper);
            return app.questionPaper;
        };

        app.getPaper = function (questionPaperDetails) {
            console.log('inside questionPaperDetails' + questionPaperDetails);
            app.questionPaperInfo = [];
            PaperDetails.getPaper(questionPaperDetails).then(function (data) {
                console.log('inside getPaper');
                console.log(data.data.paperQuestions.question[0]);
                var i = 0;
                while (data.data.paperQuestions.question[i]) {
                    console.log(data.data.paperQuestions.question[i]);
                    app.questionPaperInfo.push(data.data.paperQuestions.question[i]);
                    i = i + 1;
                }
            });
            return app.questionPaperInfo;
        };

        app.makePublic = function (data) {
            app.loading = true;
            console.log('inside make public' + data.paperNo);
            console.log('inside make public' + data.paperType);
            PaperDetails.makePublic(data).then(function (data) {
                console.log(data);
                if (data.data.success) {
                    console.log(data.data.success);
                    app.loading = false;
                    app.successMsg = data.data.message;
                    $timeout(function () {
                        app.successMsg = false;
                        $location.path('/');
                    }, 2000);

                } else {
                    // functionalities when an error occurs
                    app.loading = false;
                    console.log(data.data.success);
                    app.errorMsg = data.data.message;
                }
            })
        };

        app.getCourseDetails = function (username) {
            app.courseDetails = [];
            CourseDetails.getCourseDetails(username).then(function (data) {
                console.log("inside get Course");
                var i = 0;
                while (data.data.courseDetails[i]) {
                    console.log(data.data.courseDetails[i]);
                    app.courseDetails.push(data.data.courseDetails[i]);
                    i = i + 1;
                }
            });
            return app.courseDetails;
        };


    });