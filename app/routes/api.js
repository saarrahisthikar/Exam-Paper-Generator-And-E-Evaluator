
// importing models
var User = require('../models/user');
var Instructor = require('../models/instructor');
var Student = require('../models/student');
var Course = require('../models/course');
var Question = require('../models/question');
var MCQQuestion = require('../models/mcqquestion');
var StructuredQuestion = require('../models/structuredquestion');
var Paper = require('../models/paper');
var MCQPaper = require('../models/mcqpaper');
var StructuredPaper = require('../models/structuredpaper');

// token
var jwt = require('jsonwebtoken');

var secret = 'secret'; // secret for the token

// mainling functionality
var nodemailer = require('nodemailer');
var sgTransport = require('nodemailer-sendgrid-transport');
var emailExistence = require('email-existence');

module.exports = function (router) {

    // sending mails
    var options = {
        auth: {
            api_user: 'rimazlk',
            api_key: 'saarrah@786'
        }
    }

    //user registration
    //localhost/3000/users
    router.post('/users', function (req, res) {

        var user = new User();
        user.name = req.body.name;
        user.username = req.body.username;
        user.password = req.body.password;
        user.email = req.body.email;
        user.userType = "student";

        var flag = false;

        //checking whether the fields are null
        if (user.username == null || user.username == '' || user.password == null || user.password == '' || user.email == null || user.email == '' || user.name == null || user.name == '') {
            res.json({ success: false, message: 'Fields cannot be empty' });
        } else {
            // save user 
            user.save(function (err) {
                if (err) {
                    if (err.errors != null) {
                        if (err.errors.name) {
                            res.json({ success: false, message: "invalid name" });
                        } else if (err.errors.email) {
                            res.json({ success: false, message: "invalid email" });
                        } else if (err.errors.password) {
                            res.json({ success: false, message: "invalid password" });
                        } else if (err.errors.username) {
                            res.json({ success: false, message: "invalid username" });
                        } else {
                            res.json({ success: false, message: err });
                        }

                    } else if (err) {
                        if (err.code == 11000) {
                            if (err.errmsg[61] == "u") {
                                res.json({ success: false, message: 'Username already exists ' });
                            } else if (err.errmsg[61] == "e") {
                                res.json({ success: false, message: 'Email already exists ' });
                            } else {
                                res.json({ success: false, message: err });
                            }
                        }
                    }
                } else {
                    //creating student
                    var student = new Student();
                    student.name = req.body.name;
                    student.username = req.body.username;
                    student.password = req.body.password;
                    student.email = req.body.email;

                    // saving student
                    student.save(function (err) {
                        if (err) {
                            console.log("student did not save correctly");
                        } else {
                            console.log("Student saved successfully");
                        }
                    });
                    res.json({ success: true, message: 'User saved' });
                }
            });
        }

    });

    //adding an intsrucor to the system
    router.post('/createInstructor', function (req, res) {

        //password generate function
        var randomString = function (length) {
            var text = "";
            var possible = "@!#$%^&*()_+ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            for (var i = 0; i < length; i++) {
                text += possible.charAt(Math.floor(Math.random() * possible.length));
            }
            return text;
        }
        var password = randomString(10);

        var user = new User();
        user.name = req.body.name;
        user.username = req.body.username;
        user.password = password;
        user.email = req.body.email;
        user.userType = "instructor";

        console.log(user.email);
        if (user.username == null || user.username == '' || user.password == null || user.password == '' || user.email == null || user.email == '' || user.name == null || user.name == '') {
            res.json({ success: false, message: 'Fields cannot be empty' });
        } else {
            emailExistence.check(user.email, function (err, response) {
                if (err) {
                    res.json({ success: false, message: "Email does not exists" });
                } else if (response) {
                    console.log(response);
                    user.save(function (err) {
                        if (err) {
                            if (err.errors != null) {
                                if (err.errors.name) {
                                    res.json({ success: false, message: err.errors.name.message });
                                } else if (err.errors.email) {
                                    res.json({ success: false, message: err.errors.email.message });
                                } else if (err.errors.username) {
                                    res.json({ success: false, message: err.errors.username.message });
                                } else {
                                    res.json({ success: false, message: err });
                                }

                            } else if (err) {
                                if (err.code == 11000) {
                                    if (err.errmsg[61] == "u") {
                                        res.json({ success: false, message: 'Username already exists ' });
                                    } else if (err.errmsg[61] == "e") {
                                        res.json({ success: false, message: 'Email already exists ' });
                                    } else {
                                        res.json({ success: false, message: "Username or Email already exists" });
                                    }
                                }
                                res.json({ success: false, message: "Username or Email already exists" });
                            }

                        } else {
                            //mailformat
                            var client = nodemailer.createTransport(sgTransport(options));
                            var email = {
                                from: 'QuizAndEvaluator-Admin, quizandevaluator@gmail.com',
                                to: user.email,
                                subject: 'Addition of Instructor',
                                text: 'Hello ' + user.name + '. Your account of Exam Paper Generator And E-Evaluator for instructor access was created. This e-mail contains login details to the system. Username :' + user.username + 'Password : ' + password + 'You can activate your account using this link : http://localhost:3000/login. Thank You!!!',
                                html: 'Hello ' + user.name + '. Your account of Exam Paper Generator And E-Evaluator for instructor access was created. This e-mail contains login details to the system.<br><br><b>Username : </b>' + user.username + '<br><b>Password : </b>' + password + '<br><br><br>You can activate your account using this link : <a href="http://localhost:3000/login">http://localhost:3000/login.</a><br><br><br>Thank You!!!'
                            };

                            //sending mail to client
                            client.sendMail(email, function (err, info) {
                                if (err) {
                                    res.json({ success: false, message: "Failure during mail sending" });
                                }
                                else {
                                    console.log('Message sent: ' + info);
                                }
                            });

                            // creating instructor 
                            var instructor = new Instructor();
                            instructor.name = req.body.name;
                            instructor.username = req.body.username;
                            instructor.password = req.body.password;
                            instructor.email = req.body.email;

                            //saving instructor
                            instructor.save(function (err) {
                                if (err) {
                                    console.log("Instructor did not save correctly");
                                } else {
                                    console.log("Instructor saved successfully");
                                }
                            });

                            res.json({ success: true, message: 'Instructor has been created successfully' });
                        }
                    });
                } else {
                    //sending non exixtance of the mail box
                    res.json({ success: false, message: "Mailbox does not exist for the given email address" });
                }
            });
        }

    });

    // create course 
    router.post('/createCourse', function (req, res) {

        var course = new Course();
        course.courseTitle = req.body.courseTitle;
        course.moduleCode = req.body.moduleCode;
        course.description = req.body.description;
        course.instructor = req.body.username;

        //   checking for null information
        if (course.courseTitle == null || course.courseTitle == '' || course.moduleCode == null || course.moduleCode == '' || course.description == null || course.description == '') {
            res.json({ success: false, message: 'Fields cannot be empty' });
        } else {
            //    course save
            course.save(function (err) {
                if (err) {
                    if (err.errors != null) {
                        if (err.errors.courseTitle) {
                            res.json({ success: false, message: err.errors.courseTitle.message });
                        } else if (err.errors.moduleCode) {
                            res.json({ success: false, message: err.errors.moduleCode.message });
                        } else if (err.errors.description) {
                            res.json({ success: false, message: err.errors.description.message });
                        } else {
                            res.json({ success: false, message: err });
                        }
                    } else if (err) {
                        res.json({ success: false, message: "module code already exists" });
                    }

                } else {
                    res.json({ success: true, message: 'Course saved' });
                }
            });
        }

    });

    //Add Structred Question route
    router.post('/addStructuredQuestion', function (req, res) {

        var question = new StructuredQuestion();
        question.question = req.body.question;
        question.difficultyLevel = req.body.difficultyLevel;
        question.keyWord1 = req.body.keyWord1;
        question.keyWord2 = req.body.keyWord2;
        question.keyWord3 = req.body.keyWord3;
        question.keyWord4 = req.body.keyWord4;
        question.instructor = req.body.username;
        question.moduleCode = req.body.moduleCode;

        //checking for null fields
        if (question.question == null || question.question == '' || question.difficultyLevel == null || question.difficultyLevel == '') {
            res.json({ success: false, message: 'Fields cannot be empty' });
            console.log.apply("empty fields");
        } else {
            // save Structred question
            question.save(function (err) {
                if (err) {
                    if (err.errors != null) {
                        if (err.errors.question) {
                            res.json({ success: false, message: err.errors.question.message });
                        } else if (err.errors.difficultyLevel) {
                            res.json({ success: false, message: err.errors.difficultyLevel.message });
                        } else if (err.errors.keyWord1) {
                            res.json({ success: false, message: err.errors.keyWord1.message });
                        } else {
                            res.json({ success: false, message: err });
                        }
                    } else if (err) {
                        res.json({ success: false, message: "module code already exists" });
                    }
                } else {
                    var genQuestion = new Question();

                    genQuestion.difficultyLevel = req.body.difficultyLevel;
                    genQuestion.questionType = req.body.questionType;
                    genQuestion.instructor = req.body.username;
                    genQuestion.question = req.body.question;

                    //    save question
                    genQuestion.save();

                    res.json({ success: true, message: 'Question saved' });
                }
            });
        }

    });

    //Add MCQ Question route
    router.post('/addMCQQuestion', function (req, res) {

        var question = new MCQQuestion();
        question.question = req.body.question;
        question.difficultyLevel = req.body.difficultyLevel;
        question.correctAns = req.body.correctAns;
        question.wrongAns1 = req.body.wrongAns1;
        question.wrongAns2 = req.body.wrongAns2;
        question.wrongAns3 = req.body.wrongAns3;
        question.wrongAns4 = req.body.wrongAns4;
        question.instructor = req.body.username;
        question.moduleCode = req.body.moduleCode;

        //    checking for null values       
        if (question.question == null || question.question == '' || question.difficultyLevel == null || question.difficultyLevel == '') {
            res.json({ success: false, message: 'Fields cannot be empty' });
            console.log.apply("empty fields");
        } else {
            // saving mcq question
            question.save(function (err) {
                if (err) {
                    if (err.errors != null) {
                        if (err.errors.question) {
                            res.json({ success: false, message: err.errors.question.message });
                        } else if (err.errors.difficultyLevel) {
                            res.json({ success: false, message: err.errors.difficultyLevel.message });
                        } else if (err.errors.keyWord1) {
                            res.json({ success: false, message: err.errors.keyWord1.message });
                        } else {
                            res.json({ success: false, message: err });
                        }
                    } else if (err) {
                        res.json({ success: false, message: "module code already exists" });
                    }

                } else {
                    // save question
                    var genQuestion = new Question();

                    genQuestion.difficultyLevel = req.body.difficultyLevel;
                    genQuestion.questionType = req.body.questionType;
                    genQuestion.instructor = req.body.username;

                    genQuestion.save();

                    res.json({ success: true, message: 'Question saved' });
                    console.log("Question saved");
                }
            });
        }

    });

    //generate paper
    router.post('/generatePaper', function (req, res) {

        var flag = true;

        if (req.body.paperType == null || req.body.paperType == '' || req.body.difficultyLevel == null || req.body.difficultyLevel == '') {
            res.json({ success: false, message: 'Fields cannot be empty' });
            flag = false
        }

        //if the fields are not empty
        if (flag) {
            if (req.body.paperType == "mcq") {
                var paper = new MCQPaper();
                paper.difficultyLevel = req.body.difficultyLevel;
                paper.totalQuestions = req.body.totalQuestions;
                paper.instructor = req.body.username;
                paper.moduleCode = req.body.moduleCode;
                paper.question = [];
                paper.paperNo = "";

                MCQPaper.count({}, function (err, count) {
                    console.log("Number of docs: " + count + 1);
                    paper.paperNo = (count + 1);
                });

                // finding for the existence of questions
                MCQQuestion.find({ instructor: req.body.username, moduleCode: req.body.moduleCode }).select('_id question correctAns wrongAns1 wrongAns2 wrongAns3 wrongAns4').exec(function (err, questionID) {

                    if (err) res.send(err);
                    if (questionID) {
                        if (questionID.length > req.body.totalQuestions - 1) {
                            for (var i = 0; i < req.body.totalQuestions; i++) {
                                paper.question.push(questionID[i]);
                            }

                            // saving paper
                            paper.save(function (err) {
                                if (err) {
                                    // res.send('user did not save');
                                    if (err.errors != null) {
                                        if (err.errors.question) {
                                            res.json({ success: false, message: err.errors.question.message });
                                        } else if (err.errors.difficultyLevel) {
                                            res.json({ success: false, message: err.errors.difficultyLevel.message });
                                        } else {
                                            res.json({ success: false, message: err });
                                        }
                                    } else if (err) {
                                        res.json({ success: false, message: "paper code already exists" });
                                    }

                                } else {

                                    var genPaper = new Paper();
                                    genPaper.difficultyLevel = req.body.difficultyLevel;
                                    genPaper.totalQuestions = req.body.totalQuestions;
                                    genPaper.instructor = req.body.username;
                                    genPaper.moduleCode = req.body.moduleCode;
                                    genPaper.question = [];
                                    genPaper.paperNo = paper.paperNo;
                                    genPaper.save();
                                    res.json({ success: true, message: 'Paper saved', paper: paper });
                                }
                            });

                        }
                        else {
                            res.json({ success: false, message: 'Enough questions are not provided , add questions to the question bank' });

                        }
                    } else {
                        res.json({ success: false, message: 'questions not found' });
                    }

                });

            } else if (req.body.paperType == "structured") {    //structured question logic

                var paper = new StructuredPaper();
                paper.difficultyLevel = req.body.difficultyLevel;
                paper.totalQuestions = req.body.totalQuestions;
                paper.instructor = req.body.username;
                paper.moduleCode = req.body.moduleCode;
                paper.question = [];
                paper.paperNo = "";


                //number of paper count
                StructuredPaper.count({}, function (err, count) {
                    paper.paperNo = (count + 1);
                });

                //    finding the availability of question
                StructuredQuestion.find({ difficultyLevel: req.body.difficultyLevel, moduleCode: req.body.moduleCode, instructor: req.body.username }).select('_id question keyWord1 keyWord2 keyWord3 keyWord4').exec(function (err, questionID) {

                    if (err) res.send(err);
                    if (questionID) {
                        if (questionID.length > req.body.totalQuestions - 1) {

                            for (var i = 0; i < req.body.totalQuestions; i++) {
                                paper.question.push(questionID[i]);
                            }

                            // saving paper
                            paper.save(function (err) {
                                if (err) {
                                    if (err.errors != null) {
                                        if (err.errors.question) {
                                            res.json({ success: false, message: err.errors.question.message });
                                        } else if (err.errors.difficultyLevel) {
                                            res.json({ success: false, message: err.errors.difficultyLevel.message });
                                        } else {
                                            res.json({ success: false, message: err });
                                        }
                                    } else if (err) {
                                        res.json({ success: false, message: "paper code already exists" });
                                    }

                                } else {

                                    var genPaper = new Paper();

                                    genPaper.difficultyLevel = paper.difficultyLevel;
                                    genPaper.totalQuestions = paper.totalQuestions;
                                    genPaper.instructor = paper.instructor;
                                    genPaper.question = paper.question;
                                    genPaper.paperNo = paper.paperNo;

                                    // saving paper
                                    genPaper.save();

                                    res.json({ success: true, message: 'Paper saved', paper: paper });
                                }
                            });
                        }
                        else {
                            res.json({ success: false, message: 'enough questions are not there , add questions to the question bank' });
                        }
                    } else {
                        res.json({ success: false, message: 'questions not found' });
                    }
                });
            }
        }

    });

    router.get('/getPaper/:questionType/:paperNo', function (req, res) {

        // checking the paper type
        if (req.params.questionType == 'mcq') {
            MCQPaper.findOne({ paperNo: req.params.paperNo }).select('question').exec(function (err, questions) {

                if (err) res.send(err);
                if (questions) {
                    res.json({ paperQuestions: questions });
                } else {
                    res.json({ success: false, message: 'questions not found' });
                }

            });
        } else if (req.params.questionType == 'structured') {
            StructuredPaper.findOne({ paperNo: req.params.paperNo }).select('question').exec(function (err, questions) {

                if (err) res.send(err);
                if (questions) {
                    res.json({ paperQuestions: questions });
                } else {
                    res.json({ success: false, message: 'questions not found' });
                }
            });
        }

    });

    // making the question paper public
    router.post('/makePublic', function (req, res) {

        if (req.body.paperType == 'mcq') {
            // logic for mcq paper
            MCQPaper.update({ paperNo: req.body.paperNo }, {
                public: 'true',
            }, function (err, affected, resp) {
                if (err) {
                    res.json({ success: false, message: 'An error occured' });
                } else {
                    res.json({ success: true, message: 'successfully made public' })
                }
            });
            // logic for Structured Paper
        } else if (req.body.paperType == 'structured') {
            StructuredPaper.update({ paperNo: req.body.paperNo }, {
                public: 'true',
            }, function (err, affected, resp) {
                if (err) {
                    res.json({ success: false, message: 'An error occured' });
                } else {
                    res.json({ success: true, message: 'successfully made public' })
                }
            });
        }

    });

    //student
    // enroll courses
    router.post('/enroll', function (req, res) {

        //    student updating courses
        Student.update({ username: req.body[1] }, { $push: { courses: req.body[0] } }, function (err, affected, resp) {
            if (err) {
                console.log(err);
                res.json({ success: false, message: 'An error occured' });
            } else {
                res.json({ success: true, message: 'successfully made enrolled' })
            }
        });

    });

    // get enrolled coourses by a particular student
    router.get('/enrolledCourses/:username', function (req, res) {

        Student.findOne({ username: req.params.username }).select('courses').exec(function (err, data) {
            console.log("backend username :" + req.params.username);
            if (err) {
                res.json({ courses: {} });
            } else {
                res.json({ courses: data });
            }
        });

    });

    //user login
    //localhost/3000/authenticate
    router.post('/authenticate', function (req, res) {

        // finding user
        User.findOne({ username: req.body.username }).select('name username email password userType').exec(function (err, user) {
            if (err) {
                throw err;
            }
            if (!user) {
                res.json({ success: false, message: 'Invalid login - check username and password' });
            } else if (user) {
                if (req.body.password) {
                    var validPassword = user.comparePassword(req.body.password);
                } else {
                    res.json({ success: false, message: 'password not provided' });
                }
                if (validPassword) {
                    var token = jwt.sign({ name: user.name, username: user.username, userType: user.userType, email: user.email }, secret, { expiresIn: '24h' });
                    res.json({ success: true, message: 'login successful', token: token });
                } else {
                    res.json({ success: false, message: 'Invalid login - check username and password' });
                }
            }
        });

    });

    // checking the availability of the username
    router.post('/checkUsername', function (req, res) {

        //   finding the username
        User.findOne({ username: req.body.username }).select('username').exec(function (err, user) {
            if (err) throw err;
            if (user) {
                res.json({ success: false, message: "username already exists" });
            } else {
                res.json({ success: true, message: "valid username" });
            }
        });

    });

    //checking mail
    router.post('/checkEmail', function (req, res) {

        //finding user with email
        User.findOne({ email: req.body.email }).select('email').exec(function (err, user) {
            if (err) throw err;
            if (user) {
                res.json({ success: false, message: "email already exists" });
            } else {
                res.json({ success: true, message: "valid email" });
            }
        });

    });

    //get course details
    router.get('/courseDetails/:username', function (req, res) {

        // finding instructors courses
        Course.find({ instructor: req.params.username }).select().exec(function (err, courses) {
            if (err) res.send(err);
            res.json({ courseDetails: courses });
        });

    });

    //get paperdetails
    router.get('/getPaperDetails/:courseID/:questionType', function (req, res) {

        //    check question type and few more
        if (req.params.questionType == 'mcq') {
            MCQPaper.find({ moduleCode: req.params.courseID }).select().exec(function (err, paper) {
                if (err) res.send(err);
                res.json({ paperDetails: paper });
            });
        } else if (req.params.questionType == 'structured') {
            StructuredPaper.find({ moduleCode: req.params.courseID }).select().exec(function (err, paper) {
                if (err) res.send(err);
                res.json({ paperDetails: paper });
            });
        } else {
            console.log('invalid entry');
        }

    });

    //get public paperdetails
    router.get('/getPublicPaperDetails/:courseID/:questionType', function (req, res) {

        //    if exam paper is public get them
        if (req.params.questionType == 'mcq') {
            MCQPaper.find({ moduleCode: req.params.courseID, public: true }).select().exec(function (err, paper) {
                if (err) res.send(err);
                res.json({ paperDetails: paper });
            });
        } else if (req.params.questionType == 'structured') {
            StructuredPaper.find({ moduleCode: req.params.courseID, public: true }).select().exec(function (err, paper) {
                if (err) res.send(err);
                res.json({ paperDetails: paper });
            });
        } else {
            console.log('invalid entry');
        }

    });

    //get marks
    router.post('/getPaperMarks', function (req, res) {

        if (req.body.paperType == 'mcq') {
            // get answers for the questions
            MCQPaper.findOne({ paperNo: req.body.paperNo }).select().exec(function (err, data) {
                if (err) {
                    res.json({ message: "No papers found", data: null, success: true });
                } else {
                    // marks calculation logic
                    var count = 0;
                    var tot = 0;
                    for (var i = 0; i < data.question.length; i++) {

                        if (req.body.answers[i] == data.question[i].correctAns) {
                            count = count + 1;
                        }
                        tot = tot + 1;

                    }

                    var percentage = (count / tot) * 100;
                    //   enter student marks             
                    Student.update({ username: req.body.username }, { $push: { marks: percentage } }, function (err, affected, resp) {
                        if (err) {
                            console.log(err);
                        } else {
                        }
                    });
                    res.json({ message: "successfully submitted", data: percentage, success: true });
                }
            });
        } else if (req.body.paperType == 'structured') {
            // get answers for the question
            StructuredPaper.findOne({ paperNo: req.body.paperNo }).select().exec(function (err, data) {
                if (err) {
                    res.json({ message: "No papers found", data: null, success: false });
                } else {
                    //    marks calculation logic
                    var count = 0;
                    var tot = 0;

                    for (var i = 0; i < data.question.length; i++) {
                        if (req.body.answers[i].toLocaleLowerCase().includes(data.question[i].keyWord1.toLocaleLowerCase())) {
                            count = count + 1;
                        }
                        if (req.body.answers[i].toLocaleLowerCase().includes(data.question[i].keyWord2.toLocaleLowerCase())) {
                            count = count + 1;
                        }
                        if (req.body.answers[i].toLocaleLowerCase().includes(data.question[i].keyWord3.toLocaleLowerCase())) {
                            count = count + 1;
                        }
                        if (req.body.answers[i].toLocaleLowerCase().includes(data.question[i].keyWord4.toLocaleLowerCase())) {
                            count = count + 1;
                        }
                        tot = tot + 4;
                    }

                    var percentage = (count / tot) * 100;
                    // enter student marks
                    //   enter student marks             
                    Student.update({ username: req.body.username }, { $push: { marks: percentage } }, function (err, affected, resp) {
                        if (err) {
                            console.log(err);
                        } else {
                        }
                    });
                    res.json({ message: "successfully submitted", data: percentage, success: true });
                }
            });
        }

    });

    //get progress report
    router.get('/progress/:username', function (req, res) {

        // get marks
        Student.find({ username: req.params.username }).select('marks').exec(function (err, marks) {
            if (err) {
                res.json({ success: false, message: "error when finding", marks: {} });
            }
            else if (marks == null) {
                res.json({ success: false, message: "marks not found", marks: {} });
            }
            else {
                res.json({ success: true, message: "marks found", marks: marks });
            }
        });

    });

    // get all course details
    router.get('/courseDetails', function (req, res) {

        // get courses 
        Course.find().select().exec(function (err, courses) {
            if (err) res.send(err);
            res.json({ courseDetails: courses });
        });

    });

    //admin
    //get instructor info
    router.get('/instructorInfo', function (req, res) {

        //   get instructor details
        Instructor.find().select().exec(function (err, instructor) {
            if (err) res.send(err);
            if (instructor) {
                res.json({ message: "instructor", instructor: instructor });
            }
        });

    });

    //get student info
    router.get('/studentInfo', function (req, res) {

        // return student info
        Student.find().select().exec(function (err, student) {
            if (err) res.send(err);
            if (student) {
                res.json({ message: "student", student: student });
            }
        });

    });

    //middleware
    router.use(function (req, res, next) {

        var token = req.body.token || req.body.query || req.headers['x-access-token'];

        if (token) {
            jwt.verify(token, secret, function (err, decoded) {
                if (err) {
                    res.json({ success: false, message: 'Invalid token' });
                } else {
                    req.decoded = decoded;
                    next();
                }
            });

        } else {
            res.json({ success: false, message: 'No token found' });
        }

    });

    // get decoded token
    router.post('/me', function (req, res) {

        res.send(req.decoded);

    });

    // renew username
    router.post('/renewToken/:username', function (req, res) {

        // get user
        User.findOne({ username: req.params.username }).select().exec(function (err, user) {
            if (err) throw err;
            if (!user) {
                res.json({ success: false, message: 'No user was found' });
            } else {
                var token = jwt.sign({ name: user.name, username: user.username, userType: user.userType, email: user.email }, secret, { expiresIn: '5s' });
                res.json({ success: true, message: 'login successful', token: token });
            }
        });
    });
    return router;

}

