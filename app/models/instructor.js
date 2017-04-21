
// User Schema

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');
var validate = require('mongoose-validator');
var titlize = require('mongoose-title-case');
var course = require('./course');

// validating the name
var nameValidator = [
    validate({
        validator: 'isLength',
        arguments: [3, 100],
        message: 'name should be between {ARGS[0]} and {ARGS[1]} characters'
    }),
    validate({
        validator: 'matches',
        arguments: /^(([a-zA-Z]{3,40})+[ ]+([a-zA-Z]{3,40}))$/,
        message: 'Name can have only letters. There should be a space between names. Cannot include numbers, special characters.'
    })
];

// validating the username
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

// validating the email
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

//creating the instructor schema
var InstructorSchema = new Schema({
    name: { type: String, require: true, validate: nameValidator },
    username: { type: String, lowercase: true, require: true, unique: true, validate: usernameValidator },
    password: { type: String, require: true },
    email: { type: String, lowercase: true, require: true, unique: true, validate: emailValidator },
    courses: [{ type: Schema.Types.ObjectId, ref: course }]
});

InstructorSchema.plugin(titlize, {
    paths: ['name']// Array of paths 
});

//encrypting password
InstructorSchema.pre('save', function (next) {
    var user = this;
    bcrypt.hash(user.password, null, null, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
    });
});


module.exports = mongoose.model('Instructor', InstructorSchema);