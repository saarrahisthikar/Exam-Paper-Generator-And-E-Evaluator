
var User = require('../models/user');
var jwt = require('jsonwebtoken');
// secret for the token
var secret = 'secret';


module.exports = function (router) {

    //user registration
    //localhost/3000/users
    router.post('/users', function (req, res) {

        var user = new User();
        user.name = req.body.name;
        user.username = req.body.username;
        user.password = req.body.password;
        user.email = req.body.email;
        user.userType = "admin";

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
    return router;
}

