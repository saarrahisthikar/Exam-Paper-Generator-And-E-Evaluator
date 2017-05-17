
var Student = require('../app/models/student');

module.exports = function () {

    Student.find().select().exec(function (err, student) {

        if (err) return false;
        if (student) {
            return true;
        }

    });
}