var User = require('../app/models/user');
var Student = require('../app/models/student');

module.exports = function (name, username, password, email) {
    var user = new User();
    user.name = name;
    user.username = username;
    user.password = password;
    user.email = email;
    user.userType = "student";

    var flag = false;

    if (user.username == null || user.username == '' || user.password == null || user.password == '' || user.email == null || user.email == '' || user.name == null || user.name == '') {
        return false;
    } else {
        user.save(function (err) {
            if (err) {
                // res.send('user did not save');
                if (err.errors != null) {
                    if (err.errors.name) {
                        return false;
                    } else if (err.errors.email) {
                        return false;
                    } else if (err.errors.password) {
                        return false;
                    } else if (err.errors.username) {
                        return false;
                    } else {
                        return false;
                    }

                } else if (err) {
                    if (err.code == 11000) {
                        if (err.errmsg[61] == "u") {
                            return false;
                        } else if (err.errmsg[61] == "e") {
                            return false;
                        } else {
                            return false;
                        }
                    }
                }
            } else {
                //creating student
                var student = new Student();
                student.name = name;
                student.username = username;
                student.password = password;
                student.email = email;

                // saving student
                student.save();
                return true;
            }
        });
    }
}
