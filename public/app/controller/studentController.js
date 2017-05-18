angular.module('studentController', ['studentServices', 'paperServices', 'authServices', 'courseServices', 'chart.js'])

    .controller('studentController', function ($q, StudentMarks, CheckPaper, $routeParams, PaperDetails, $scope, Auth, CourseDetails, StudentCourse, $timeout, $location) {

        var app = this;
        app.loading = false;

        // getting enrolled courses
        app.getEnrolledCourses = function () {

            app.enrollDetails = [];

            if (Auth.getUser() != undefined) { // checking the availability of the username
                // get username
                Auth.getUser().then(function (data) {
                    console.log("front end username " + data.data.username);
                    StudentCourse.getCourses(data.data.username).then(function (data) {
                        console.log("inside get Course ");
                        console.log("course :" + data.data.courses.courses[0]);
                        var i = 0;
                        while (data.data.courses.courses[i]) {
                            console.log(data.data.courses.courses[i]);
                            app.enrollDetails.push(data.data.courses.courses[i]);
                            i = i + 1;
                        }
                    });
                });
            }

            return app.enrollDetails;

        }


        // get router parameters
        app.getRouterParams = function () {
            return $routeParams.courseID;
        };

        // get router params for question paper
        app.questionPaper = []

        app.getRouterParamsPaper = function () {
            app.questionPaper.push($routeParams.questionType);
            app.questionPaper.push($routeParams.paperNo);

            return app.questionPaper;

        };

        // get paper details
        app.getPaperDetails = function (paperInfo) {

            app.paperDetails = [];

            //  get paper details
            PaperDetails.getPublicPaperDetails(paperInfo).then(function (data) {

                var i = 0;
                while (data.data.paperDetails[i]) {
                    app.paperDetails.push(data.data.paperDetails[i]);
                    i = i + 1;
                }

            });

            return app.paperDetails;

        };

        // enrolling to courses
        app.enroll = function (moduleCode, username) {

            app.loading = true;
            app.errorMsg = false;

            // student enrolling to courses
            StudentCourse.enroll(moduleCode, username).then(function (data) {
                if (data.data.success) {
                    app.loading = false;
                    app.successMsg = data.data.message;
                    $timeout(function () {
                        $location.path('stuViewCourses/'+username);
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

        // checking whether student is enrolled
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

        // get paper
        app.getPaper = function (questionPaperDetails) {

            app.questionPaperInfo = [];

            //  get question paper
            PaperDetails.getPaper(questionPaperDetails).then(function (data) {

                var i = 0;
                while (data.data.paperQuestions.question[i]) {
                    app.questionPaperInfo.push(data.data.paperQuestions.question[i]);
                    i = i + 1;
                }

            });

            return app.questionPaperInfo;

        };

        // submitting answers
        app.submitAnswer = function (paperAns) {

            // correcting the paper and returning the marks
            CheckPaper.getMarks(paperAns).then(function (data) {

                app.errorMsg = false;

                if (data.data.success) {
                    console.log(data.data.success);
                    app.successMsg = data.data.message;
                    $timeout(function () {
                        app.successMsg = false;
                        $location.path('/viewMarks/' + data.data.data);
                    }, 2000);

                } else {
                    console.log(data.data.success);
                    app.errorMsg = data.data.message;
                }

            });

        }

        // Get marks from the router
        app.getRouterParamsMarks = function () {
            return $routeParams.marks;
        }

        // Generate progress report
        app.genProgressChart = function (username) {

            StudentMarks.getProgress(username).then(function (data) {

                if (data.data.success) {

                    $scope.labels = [];
                    $scope.series = ['Series A'];
                    $scope.data = data.data.marks[0].marks;

                    var i = 0;
                    while (data.data.marks[0].marks[i]) {
                        $scope.labels.push('Attempt ' + i);
                        i = i + 1;
                    }

                    $scope.onClick = function (points, evt) {
                        console.log(points, evt);
                    };
                    $scope.datasetOverride = [{ yAxisID: 'y-axis-1' }];
                    $scope.options = {
                        scales: {
                            yAxes: [
                                {
                                    id: 'y-axis-1',
                                    type: 'linear',
                                    display: true,
                                    position: 'left'
                                }
                            ]
                        }
                    };

                } else {
                    app.errorMsg = "No marks found ...try paper";
                }
            });

        }

    });