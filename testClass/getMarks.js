
var Student = require('../app/models/student');

module.exports = function (username) {

    Student.find({ username: username }).select('marks').exec(function (err, marks) {
        if (err) {
            return false
        }
        else if (marks == null) {
            return false;
        }
        else {
            return true;
        }
    });
}