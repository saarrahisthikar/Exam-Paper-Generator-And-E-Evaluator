

var Course = require('../app/models/course');
var mongoose = require('mongoose');

mongoose.connect('mongodb://saarrah:saarrah@ds141450.mlab.com:41450/exam-professor', function (err) {
    if (err) {
        console.log('failed connecting to the database');
    } else {
        console.log('successfully connected to the database');
    }
});

module.exports = function (username) {


    Course.find({ instructor: username }).select().exec(function (err, courses) {
        if (err) return true;
        else { return true; }

    });
}