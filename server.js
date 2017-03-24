var express = require('express');
var app = express();
var port = process.env.port || 3000;
var mongoose = require('mongoose');
var morgan = require('morgan');

//middleware
app.use(morgan('dev'));

//connection
mongoose.connect('mongodb://saarrah:saarrah@ds141450.mlab.com:41450/exam-professor', function (err) {
    if (err) {
        console.log('failed connecting to the database');
    } else {
        console.log('successfully connected to the database');
    }
});

//server listening
app.listen(port, function () {
    console.log('server listening on port ' + port);
});


