angular.module('instructorController', ['instructorServices', 'authServices', 'courseServices', 'paperServices'])

    .controller('instructorController', function (Course, $timeout, $location, Question, Auth, CourseDetails, Paper, $routeParams, PaperDetails) {
        var app = this;
        app.errorMsg = false;

        // addCourse
        app.addCourse = function (courseData, valid) {

            app.errorMsg = false;

            if (valid) {
                //  create course
                Course.create(courseData).then(function (data) {
                    if (data.data.success) {
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

        // get curseID fron the route
        app.getRouterParams = function () {
            return $routeParams.courseID;
        };

        // generate paper
        app.generatePaper = function (paperData, valid) {

            app.paperMCQ = false;
            app.paperStructured = false;
            app.errorMsg = false;

            // front end view geneartion
            if (paperData.paperType == 'mcq') {
                app.paperMCQ = true;
            } else if (paperData.paperType == 'structured') {
                app.paperStructured = true;
            }

            // form valid functioanlity
            if (valid) {
                Paper.generate(paperData).then(function (data) {
                    if (data.data.success) {
                        app.successMsg = data.data.message;

                        $timeout(function () {
                            app.paper = data.data.paper.question;
                            paperData = null;
                            app.successMsg = false;
                            $location.path('/showPapers');
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

        // Add questions
        app.addQuestion = function (questionData, valid) {

            app.courseErrorMsg = false;

            // if form is valid         
            if (valid) {

                //adding mcq question 
                if ((questionData.questionType) == 'mcq' && !(questionData.correctAns == undefined || questionData.wrongAns1 == undefined || questionData.wrongAns2 == undefined || questionData.wrongAns3 == undefined || questionData.wrongAns4 == undefined)) {

                    // add mcq question
                    Question.addMCQ(questionData).then(function (data) {
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

                    //    add structured question
                    Question.addStructured(questionData).then(function (data) {
                        if (data.data.success) {
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
                }

            } else {
                app.courseErrorMsg = "Please ensure that the form is filled properly";
            }
        };

        // shuffle front end question answer order
        app.shuffle = function (array) {

            for (var i = array.length - 1; i > 0; i--) {
                var j = Math.floor(Math.random() * (i + 1));
                var temp = array[i];
                array[i] = array[j];
                array[j] = temp;
            }
            return array;

        };

        // get paper details
        app.getPaperDetails = function (paperInfo) {

            app.paperDetails = [];

            //  get paper details
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

        // get the question main details
        app.questionPaper = []

        app.getRouterParamsPaper = function () {

            app.questionPaper.push($routeParams.questionType);
            app.questionPaper.push($routeParams.paperNo);

            return app.questionPaper;

        };

        // get papers
        app.getPaper = function (questionPaperDetails) {

            app.questionPaperInfo = [];

            // get paper details
            PaperDetails.getPaper(questionPaperDetails).then(function (data) {

                var i = 0;
                while (data.data.paperQuestions.question[i]) {
                    console.log(data.data.paperQuestions.question[i]);
                    app.questionPaperInfo.push(data.data.paperQuestions.question[i]);
                    i = i + 1;
                }

            });

            return app.questionPaperInfo;

        };

        // making question paper public
        app.makePublic = function (data) {

            app.loading = true;

            //   making public
            PaperDetails.makePublic(data).then(function (data) {
                if (data.data.success) {
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

        // get course details
        app.getCourseDetails = function (username) {

            app.courseDetails = [];

            // get course details
            CourseDetails.getCourseDetails(username).then(function (data) {

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