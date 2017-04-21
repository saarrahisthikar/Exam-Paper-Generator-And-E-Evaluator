
// question schema


var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var titlize = require('mongoose-title-case');

//question schema
var QuestionSchema = new Schema({
    moduleCode: { type: String, require: true, unique: true },
    question: { type: String, require: true },
    difficultyLevel: { type: String, require: true },
    keyWord1: { type: String, require: true },
    keyword2: { type: String, require: true },
    keyword3: { type: String, require: true },
    keyWord4: { type: String, require: true },
    instructor: { type: String }
});


module.exports = mongoose.model('Question', QuestionSchema);