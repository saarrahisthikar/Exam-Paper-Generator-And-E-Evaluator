var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');
var validate = require('mongoose-validator');

var usernameValidator = [
    validate({
        validator: 'isLength',
        arguments: [3, 100],
        message: 'username should be between {ARGS[0]} and {ARGS[1]} characters'
    }),
    validate({
        validator: 'isAlphanumeric',
        message: 'Username should contain letters and numbers only'
    })
];

var passwordValidator = [
    validate({
        validator: 'matches',
        arguments: /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d])(?=.*?[\W]).{8,100}$/,
        message: 'Password should contain at least one lowerase letter, one uppercase letter, a special character and a number'
    }),
    validate({
        validator: 'isLength',
        arguments: [8, 100],
        message: 'username should be between {ARGS[0]} and {ARGS[1]} characters'
    })
];

var emailValidator = [
    validate({
        validator: 'isEmail',
        message: 'Is not a valid email'
    }),
    validate({
        validator: 'isLength',
        arguments: [3, 100],
        message: 'Email should be between {ARGS[0]} and {ARGS[1]} characters'
    })
];


var UserSchema = new Schema({
    username: { type: String, lowercase: true, require: true, unique: true, validate: usernameValidator },
    password: { type: String, require: true, validate: passwordValidator },
    email: { type: String, lowercase: true, require: true, unique: true, validate: emailValidator },
    userType: { type: String, require: true }
});

//encrypting password
UserSchema.pre('save', function (next) {
    var user = this;
    bcrypt.hash(user.password, null, null, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
    });
});


UserSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);