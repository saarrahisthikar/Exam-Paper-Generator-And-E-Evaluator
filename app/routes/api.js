
var User = require('../models/user');
var jwt = require('jsonwebtoken');
var secret = 'secret';


module.exports = function (router) {

    //user registration
    //localhost/3000/users
    router.post('/users', function (req, res) {
        var user = new User();
        user.username = req.body.username;
        user.password = req.body.password;
        user.email = req.body.email;
        user.userType = req.body.userType;


        if (user.username == null || user.username == '' || user.password == null || user.password == '' || user.email == null || user.email == '' || user.userType == null || user.userType == '') {
            // res.send('fields cannot be null');
            res.json({ success: false, message: 'Fields cannot be empty' });
        } else {
            user.save(function (err) {
                if (err) {
                    // res.send('user did not save');
                    res.json({ success: false, message: 'User did not get save' });

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
        User.findOne({ username: req.body.username }).select('email username password userType').exec(function (err, user) {
            if (err) throw err;
            if (!user) {
                res.json({ success: false, message: 'user not found' });
            } else if (user) {
                if (req.body.password) {
                    var validPassword = user.comparePassword(req.body.password);
                }else{
                    res.json({ success: false, message: 'password not provided' });
                }
                    if (validPassword) {
                        var token = jwt.sign({ username: user.username, userType: user.userType}, secret, { expiresIn: '24h' });
                        res.json({ success: true, message: 'login successful', token: token});
                    } else {
                        res.json({ success: false, message: 'password not authenticated' });
                    }
                } 
            });
    });
    return router;
}

