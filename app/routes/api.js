
var User = require('../models/user');
var Course = require('../models/course');
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
                                        res.json({ success: false, message: err });
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
        // course.instructor = $window.localStorage.getItem('token').then(function (data) {
        //     return data.data.userType;
        // });

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
                console.log('user ot found - inside authenticate');
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

