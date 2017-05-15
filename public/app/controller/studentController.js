angular.module('studentController', ['studentServices', 'paperServices', 'authServices', 'courseServices'])
    // console.log('inside student controller');

    .controller('studentController', function ($q, CheckPaper, $routeParams, PaperDetails, $scope, Auth, CourseDetails, StudentCourse, $timeout, $location) {

        var app = this;
        app.errorMsg = false;
        app.loading = false;
        app.successMsg = false;

        app.getEnrolledCourses = function () {
            app.enrollDetails = [];
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

            return app.enrollDetails;

        }


        app.getRouterParams = function () {
            return $routeParams.courseID;
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

        app.getPaperDetails = function (paperInfo) {
            app.paperDetails = [];
            console.log(paperInfo);
            PaperDetails.getPublicPaperDetails(paperInfo).then(function (data) {
                console.log("inside paper details");
                var i = 0;
                console.log(data);
                while (data.data.paperDetails[i]) {
                    console.log(data.data.paperDetails[i]);
                    app.paperDetails.push(data.data.paperDetails[i]);
                    i = i + 1;
                }

            });
            return app.paperDetails;
        };

        app.enroll = function (moduleCode, username) {

            console.log('inside enroll ' + moduleCode + " " + username);
            app.loading = true;

            StudentCourse.enroll(moduleCode, username).then(function (data) {
                if (data.data.success) {
                    console.log(data.data.success);
                    app.loading = false;
                    app.successMsg = data.data.message;
                    $timeout(function () {
                        $location.path('/');
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

        app.submitAnswer = function (paperAns) {

            CheckPaper.getMarks(paperAns).then(function (data) {
                console.log("inside get paper percentage :" +JSON.stringify(data.data.data));
            });
            console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" + JSON.stringify(paperAns));
            console.log("question Tyyyyyyyyyyyyyyyyyyyyyyyyyype" + paperAns.paperType);
            console.log("question Tyyyyyyyyyyyyyyyyyyyyyyyyyype" + paperAns.paperNo);
            console.log("question Tyyyyyyyyyyyyyyyyyyyyyyyyyype" + JSON.stringify(paperAns.answers));
        }
    });