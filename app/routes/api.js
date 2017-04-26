
var User = require('../models/user');
var Instructor = require('../models/instructor');
var Student = require('../models/student');
var Course = require('../models/course');
var MCQQuestion = require('../models/mcqquestion');
var StructredQuestion = require('../models/structuredquestion');
var jwt = require('jsonwebtoken');
// secret for the token
var secret = 'secret';
var nodemailer = require('nodemailer');
var sgTransport = require('nodemailer-sendgrid-transport');
var emailExistence = require('email-existence');

module.exports = function (router) {

    // sending mails
    var options = {
        auth: {
            api_user: 'prabodha',
            api_key: 'prabodha@1994'
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

        if (user.username == null || user.username == '' || user.password == null || user.password == '' || user.email == null || user.email == '' || user.name == null || user.name == '') {
            // res.send('fields cannot be null');
            res.json({ success: false, message: 'Fields cannot be empty' });
        } else {
            user.save(function (err) {
                if (err) {
                    // res.send('user did not save');
                    if (err.errors != null) {
                        if (err.errors.name) {
                            res.json({ success: false, message: err.errors.name.message });
                        } else if (err.errors.email) {
                            res.json({ success: false, message: err.errors.email.message });
                        } else if (err.errors.password) {
                            res.json({ success: false, message: err.errors.password.message });
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
            // res.send('fields cannot be null');
            res.json({ success: false, message: 'Fields cannot be empty' });
        } else {
            console.log(user.email);
            emailExistence.check(user.email, function (err, response) {
                console.log(response);
                console.log(err);
                if (response) {
                    console.log(response);
                    user.save(function (err) {
                        if (err) {
                            // res.send('user did not save');
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
                            }

                        } else {
                            var client = nodemailer.createTransport(sgTransport(options));
                            var email = {
                                from: 'Localhost staff, staff@localhost.com',
                                to: user.email,
                                subject: 'Addition of Instructor',
                                text: 'Hello ' + user.name + '. Your account of Exam Paper Generator And E-Evaluator for instructor access was created. This e-mail contains login details to the system. Username :' + user.username + 'Password : ' + password + 'You can activate your account using this link : http://localhost:3000/login. Thank You!!!',
                                html: 'Hello ' + user.name + '. Your account of Exam Paper Generator And E-Evaluator for instructor access was created. This e-mail contains login details to the system.<br><br><b>Username : </b>' + user.username + '<br><b>Password : </b>' + password + '<br><br><br>You can activate your account using this link : <a href="http://localhost:3000/login">http://localhost:3000/login.</a><br><br><br>Thank You!!!'

                            };

                            client.sendMail(email, function (err, info) {
                                if (err) {
                                    console.log(error);
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

    // create course route

    router.post('/createCourse', function (req, res) {

        var course = new Course();
        course.courseTitle = req.body.courseTitle;
        course.moduleCode = req.body.moduleCode;
        course.description = req.body.description;
        course.instructor = req.body.username;

        console.log(course.courseTitle);
        console.log(course.moduleCode);
        console.log(course.description);


        if (course.courseTitle == null || course.courseTitle == '' || course.moduleCode == null || course.moduleCode == '' || course.description == null || course.description == '') {
            // res.send('fields cannot be null');
            res.json({ success: false, message: 'Fields cannot be empty' });
            console.log.apply("empty fields");
        } else {
            course.save(function (err) {
                if (err) {
                    // res.send('user did not save');
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
                        console.log("error inside err")
                    } else if (err) {
                        res.jason({ success: false, message: "module code already exists" });
                        console.log("module code already exists");
                    }

                } else {
                    res.json({ success: true, message: 'Course saved' });
                    console.log("course saved");
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

        // course.instructor = $window.localStorage.getItem('token').then(function (data) {
        //     return data.data.userType;
        // });

        console.log(question.question);
        console.log(question.difficultyLevel);

        if (question.question == null || question.question == '' || question.difficultyLevel == null || question.difficultyLevel == '') {
            // res.send('fields cannot be null');
            res.json({ success: false, message: 'Fields cannot be empty' });
            console.log.apply("empty fields");
        } else {
            question.save(function (err) {
                if (err) {
                    // res.send('user did not save');
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
                        console.log("error inside err")
                    } else if (err) {
                        res.jason({ success: false, message: "module code already exists" });
                        console.log("module code already exists");
                    }

                } else {
                    res.json({ success: true, message: 'Question saved' });
                    console.log("Question saved");
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

        // course.instructor = $window.localStorage.getItem('token').then(function (data) {
        //     return data.data.userType;
        // });
        console.log(question.instructor);
        console.log(question.question);
        console.log(question.difficultyLevel);

        if (question.question == null || question.question == '' || question.difficultyLevel == null || question.difficultyLevel == '') {
            // res.send('fields cannot be null');
            res.json({ success: false, message: 'Fields cannot be empty' });
            console.log.apply("empty fields");
        } else {
            question.save(function (err) {
                if (err) {
                    // res.send('user did not save');
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
                        console.log("error inside err")
                    } else if (err) {
                        res.json({ success: false, message: "module code already exists" });
                        console.log("module code already exists");
                        console.log(err);
                    }

                } else {
                    res.json({ success: true, message: 'Question saved' });
                    console.log("Question saved");
                }
            });
        }
    });

    //user login
    //localhost/3000/authenticate
    router.post('/authenticate', function (req, res) {
        console.log('inside post');
        //console.log(req.body.username);
        User.findOne({ username: req.body.username }).select('name username email password userType').exec(function (err, user) {
            if (err) {
                // console.log("error in authenticate");
                throw err;
            }
            console.log("no error in user retrieval");

            if (!user) {
                res.json({ success: false, message: 'user not found' });
                console.log('user not found - inside authenticate');
            } else if (user) {
                if (req.body.password) {
                    var validPassword = user.comparePassword(req.body.password);
                    console.log('password validilty' + validPassword);
                } else {
                    res.json({ success: false, message: 'password not provided' });
                }
                if (validPassword) {
                    var token = jwt.sign({ name: user.name, username: user.username, userType: user.userType, email: user.email }, secret, { expiresIn: '24h' });
                    res.json({ success: true, message: 'login successful', token: token });
                } else {
                    res.json({ success: false, message: 'password not authenticated' });
                }
            }

        });
    });

    // checking the availability of the username
    router.post('/checkUsername', function (req, res) {
        console.log('inside post');
        User.findOne({ username: req.body.username }).select('username').exec(function (err, user) {
            if (err) throw err;
            if (user) {
                res.json({ success: false, message: "username already exists" });
            } else {
                res.json({ success: true, message: "valid username" });
            }

        });
    });

    router.post('/checkEmail', function (req, res) {
        console.log('inside post');
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
    router.get('/courseDetails', function (req, res) {
        Course.find().select().exec(function (err, courses) {
            if (err) res.send(err);
            res.json({ courseDetails: courses });
        });
    });

    //middleware
    router.use(function (req, res, next) {
        var token = req.body.token || req.body.query || req.headers['x-access-token'];
        console.log('middleware');
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

    router.post('/me', function (req, res) {
        res.send(req.decoded);
    });

    router.post('/renewToken/:username', function (req, res) {
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

