var express = require('express');
var app = express();
var port = process.env.port || 3000;
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser')

var User = require('./app/models/user');

//middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


//connection
mongoose.connect('mongodb://saarrah:saarrah@ds141450.mlab.com:41450/exam-professor', function (err) {
    if (err) {
        console.log('failed connecting to the database');
    } else {
        console.log('successfully connected to the database');
    }
});

//localhost/3000/users
app.post('/users', function (req, res) {
    var user = new User();
    user.username = req.body.username;
    user.password = req.body.password;
    user.email = req.body.email;
    user.userType = req.body.userType;


    if (user.username == null || user.username == '' || user.password == null || user.password == '' || user.email == null || user.email == '' || user.userType == null || user.userType == '') {
        res.send('fields cannot be null');
    } else {
        user.save(function (err) {
            if (err) {
                res.send('user did not save');
            } else {
                res.send('user saved');
            }
        });
    }
});


app.get("/sar", function (req, res) {
    console.log("Insde sarrah" + req.query);
    res.send('inside Sar');
})

//server listening
app.listen(port, function () {
    console.log('server listening on port ' + port);
});


