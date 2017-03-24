
var User = require('../models/user');

//localhost/3000/users
module.exports = function (router) {

    router.post('/users', function (req, res) {
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
    return router;
}