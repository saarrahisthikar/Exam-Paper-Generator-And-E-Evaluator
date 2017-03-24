var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var UserSchema = new Schema({
    username: { type: String, lowercase: true, require: true, unique: true },
    password: { type: String, require: true },
    email: { type: String, lowercase: true, require: true, unique: true },
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


module.exports = mongoose.model('User', UserSchema);